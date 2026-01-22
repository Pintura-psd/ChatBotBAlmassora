package com.ChatBot.demo.service;

import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.repository.QARepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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

    public QAService(QARepository prRepo, EstadisticasService estadisticasService1) {
        this.qaRepo = prRepo;
        QAS =prRepo.findAll();
        this.estadisticasService = estadisticasService1;
    }

    //Crear el objeto pregunta respuesta
    public QA crearPreguntaRespuesta(QA QA){
        return qaRepo.save(QA);
    }
    public void crearPreguntaSinRespuesta(String pregunta,String respuesta,long tiempoRespuesta){
        QA p = new QA(pregunta,respuesta,tiempoRespuesta);

        qaRepo.save(p);
    }

    public List<QA> getPreguntaSinRespuesta(){
    return qaRepo.findAll().stream().filter(p->!p.hasRespuesta()).toList();
    }


    public String getRespuesta(String mensaje) {
        long inicioPregunta = System.currentTimeMillis();
       try{
           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_JSON);

           Map<String, Object> body = Map.of(
                   "question", mensaje
           );

           HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

           ResponseEntity<Map> response = restTemplate.postForEntity("https://chatbot.valenciainformada.com/api/chat", request, Map.class);

           long tiempoRespuesta = System.currentTimeMillis() - inicioPregunta;

           Map<String, Object> responseBody = response.getBody();

           String respuesta = responseBody.get("answer").toString();
           if(respuesta.equals("No consta en el dataset.")){
               crearPreguntaSinRespuesta(mensaje,"",tiempoRespuesta);
           }else{
               crearPreguntaSinRespuesta(mensaje,respuesta,tiempoRespuesta);
           }
           return respuesta;

       }catch (Exception e){
         return e.toString();
       }
    }

    public QA updateRespuesta(QA QA){
        return qaRepo.save(QA);
    }

//    public void cargarJsonEnBD(String rutaArchivo) {
//        ObjectMapper mapper = new ObjectMapper();
//        try (BufferedReader br = new BufferedReader(new FileReader(rutaArchivo))) {
//            String linea;
//            while ((linea = br.readLine()) != null) {
//                if (linea.trim().isEmpty()) continue;
//                PreguntaRespuesta pr = mapper.readValue(linea, PreguntaRespuesta.class);
//                // Guardar en BD
//                preguntaRespuestaRepository.save(pr);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
}
