package com.ChatBot.demo.service;

import com.ChatBot.demo.client.QAClient;
import com.ChatBot.demo.client.QAFastClient;
import com.ChatBot.demo.dto.chatApi.EntrenarDTO;
import com.ChatBot.demo.dto.chatApi.FastResponseDTO;
import com.ChatBot.demo.dto.chatApi.FastTrainingDTO;
import com.ChatBot.demo.dto.chatApi.RespuestaEntrenamientoDTO;
import com.ChatBot.demo.dto.front.FastQADTO;
import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.model.EstadoPregunta;
import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.repository.EntrenamientoRepository;
import com.ChatBot.demo.repository.QARepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EntrenamientoService {
    private final EntrenamientoRepository entrenamientoRepository;
    private final ResourceLoader resourceLoader;
    private final QAClient qaClient;
    private final QAFastClient fastClient;
    private final QARepository qarepository;
    public EntrenamientoService(QARepository qarepository,EntrenamientoRepository entrenamientoRepository, ResourceLoader resourceLoader, QAClient qaClient,  QAFastClient fastClient) {
        this.entrenamientoRepository = entrenamientoRepository;
        this.resourceLoader = resourceLoader;
        this.qaClient = qaClient;
        this.fastClient = fastClient;
        this.qarepository = qarepository;
    }

    public void save(Entrenamiento entrenamiento){
        entrenamientoRepository.save(entrenamiento);
    }
    public void saveAll(List<Entrenamiento> entrenamientos){
        entrenamientoRepository.saveAll(entrenamientos);
    }
    public List<Entrenamiento> findAll(){
        return entrenamientoRepository.findAll();
    }
    public void cargarJsonEnBD(String nombreArchivo) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            // Cargamos el archivo del classpath
            Resource resource = resourceLoader.getResource("classpath:" + nombreArchivo);
            
            if (!resource.exists()) {
                throw new IllegalArgumentException("Archivo no encontrado en classpath: " + nombreArchivo);
            }
            
            // Leemos todas las líneas del archivo
            List<String> lineas = Files.readAllLines(resource.getFile().toPath(), StandardCharsets.UTF_8);
            List<Entrenamiento> entrenamientos = lineas.stream().map(l -> mapper.readValue(l, Entrenamiento.class)).toList();
            saveAll(entrenamientos);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al cargar JSON: " + e.getMessage(), e);
        }
    }

    public ResponseEntity<RespuestaEntrenamientoDTO> entrenarChatbot(){
        List<EntrenarDTO> listaEntrenamiento= findAll().stream().map(EntrenarDTO::new).toList();
        ResponseEntity<RespuestaEntrenamientoDTO> respuesta = qaClient.train(listaEntrenamiento);
        System.out.println(respuesta.getStatusCode());
        return respuesta;
    }

    public List<FastQADTO> getFastQAS(){
        return qarepository.findAll().stream()
                .filter(p -> !p.getEstado().equals(EstadoPregunta.REFUSED))
                .map(FastQADTO::new)
                .toList();

    }
    public void modificarFastQA(FastQADTO fastQADTO){
        QA qa = qarepository.findById(fastQADTO.getId()).orElse(null);
        qa.setPregunta(fastQADTO.getPrompt());
        qa.setRespuesta(fastQADTO.getResponse());
        qa.setEstado(EstadoPregunta.TO_TRAIN);
    }
    @Scheduled(cron = "0 0 0 * * *")
    public void entrenarFastTraining(){
        List<FastResponseDTO> err = new ArrayList<>();
        try {
             qarepository.findByEstado(EstadoPregunta.TO_TRAIN)
                    .forEach(qa -> {
                        FastTrainingDTO t = new FastTrainingDTO(qa);
                        FastResponseDTO r = fastClient.train(t);
                        if(!r.getDetail().isBlank()) err.add(r);
                        else {
                            qa.setEstado(EstadoPregunta.TRAINED);
                            System.out.println("Entrenada: "+qa);
                        }
                        qarepository.save(qa);
                    });
             err.forEach(System.err::println);

        }catch (Exception e){
            throw new RuntimeException(e);
        }

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
