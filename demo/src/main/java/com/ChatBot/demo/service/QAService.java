package com.ChatBot.demo.service;

import com.ChatBot.demo.client.QAClient;
//import com.ChatBot.demo.dto.chatApi.EntrenarDTO;
import com.ChatBot.demo.client.QAFastClient;
import com.ChatBot.demo.dto.chatApi.FastChatAnswerDTO;
import com.ChatBot.demo.dto.chatApi.FastChatDTO;
import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.model.EstadoPregunta;
import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.repository.EntrenamientoRepository;
import com.ChatBot.demo.repository.QARepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class QAService {
    private final QARepository qaRepo;
    private List<QA> QAS = new ArrayList<>();
    private final RestTemplate restTemplate = new RestTemplate();
    private final EstadisticasService estadisticasService;
    private final EntrenamientoRepository entrenamientoRepo;
    private final QAClient qaClient;
    private final QAFastClient qaFastClient;

    public QAService(QARepository prRepo, EstadisticasService estadisticasService1, EntrenamientoRepository entrenamientoRepo, QAClient qaClient, QAFastClient qaFastClient) {
        this.entrenamientoRepo = entrenamientoRepo;
        this.qaRepo = prRepo;
        QAS =prRepo.findAll();
        this.estadisticasService = estadisticasService1;
        this.qaClient = qaClient;
        this.qaFastClient = qaFastClient;
    }

    //Crear el objeto pregunta respuesta
    public QA crearPreguntaRespuesta(QA QA){
        return qaRepo.save(QA);
    }
    public void almacenarRespuestas(String pregunta, String respuesta, long tiempoRespuesta){
        QA p = new QA(pregunta,respuesta,tiempoRespuesta);
        qaRepo.save(p);
    }

    public List<QA> getPreguntaSinRespuesta(){
    return qaRepo.findAll().stream().filter(p->!p.hasRespuesta()).toList();
    }

//    public List<EntrenarDTO> getPreguntaConRespuesta(String pregunta){
//        return qaRepo.findAll().stream().filter(QA::hasRespuesta).map(EntrenarDTO::new).toList();
//    }
    @Deprecated
    public void entrenarPreguntaRespuesta() {
        List<Entrenamiento>preguntasEntrenadas=entrenamientoRepo.findAll();

        List<Map<String, String>> qaList = preguntasEntrenadas.stream()
                .map(e -> Map.of(
                        "question",  e.getPrompt(),
                        "answer", e.getResponse()
                ))
                .toList();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of("qa", qaList);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        restTemplate.postForEntity(
                "https://chatbot.valenciainformada.com/api/chat/train/batch",
                request,
                Void.class
        );
    }
//version 1.0
    public String getRespuesta(String mensaje) {
        long inicioPregunta = System.currentTimeMillis();
       try{
           Map<String, String> request = Map.of("question", mensaje);
           String respuesta = qaClient.getRespuesta(request).getAnswer();
           long tiempoRespuesta = System.currentTimeMillis() - inicioPregunta;
           
           //String respuesta = respuestaMap.get("answer").toString();
           if(respuesta.equals("No consta en el dataset.")){
               almacenarRespuestas(mensaje,"",tiempoRespuesta);
           }else{
               almacenarRespuestas(mensaje,respuesta,tiempoRespuesta);
           }
           return respuesta;

       }catch (Exception e){
         return e.toString();
       }
    }
//version 2.0
    public String getRespuestaFast(String mensaje) throws Exception{
        try{
            FastChatDTO request = new FastChatDTO();
            request.setPrompt(mensaje);
            request.setSystem("Responde en español, claro y breve.");
            request.setMax_new_tokens(100);
            request.setTemperature(0.2);
            request.setTop_p(0.9);
            request.setRag(true);

            FastChatAnswerDTO respuesta = qaFastClient.getRespuestaFast(request);
            if (respuesta == null || "No consta en el dataset.".equalsIgnoreCase(respuesta.getText())) {
                assert respuesta != null;
                almacenarRespuestas(mensaje, "", respuesta.getLatencyMs());
            } else {
                almacenarRespuestas(mensaje, respuesta.getText(), respuesta.getLatencyMs()
                );
            }
            return respuesta.getText();
        }catch (Exception e){
            throw  new RuntimeException(e);
        }
    }
    public QA updateRespuesta(QA qa){
        // Buscar la entidad existente por ID
        QA existente = qaRepo.findById(qa.getId())
            .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con ID: " + qa.getId()));
        
        // Actualizar solo los campos que vienen del frontend
        if (qa.getRespuesta() != null) {
            existente.setRespuesta(qa.getRespuesta());
        }
        if (qa.getPregunta() != null) {
            existente.setPregunta(qa.getPregunta());
        }


        return qaRepo.save(existente);
    }

    public void deletePregunta(Long id) {
        QA existente = qaRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con ID: " + id));
        existente.setEstado(EstadoPregunta.REFUSED);
    }

    public List<QA> searchPreguntas(String query) {
        try{
            return qaRepo.buscarPorTexto(query);
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public List<QA> getPreguntas(){
        return qaRepo.findAll();
    }

//    public void cargarJsonEnBD(String rutaArchivo) {
//        ObjectMapper mapper = new ObjectMapper();
//        try (BufferedReader br = new BufferedReader(new FileReader(rutaArchivo))) {
//            String linea;
//            while ((linea = br.readLine()) != null) {
//                if (linea.trim().isEmpty()) continue;
//                QA pr = mapper.readValue(linea, .class);
//                // Guardar en BD
//                preguntaRespuestaRepository.save(pr);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
}
