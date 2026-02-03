package com.ChatBot.demo.service;

import com.ChatBot.demo.client.QAClient;
import com.ChatBot.demo.dto.EntrenarDTO;
import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.repository.EntrenamientoRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
public class EntrenamientoService {
    private final EntrenamientoRepository entrenamientoRepository;
    private final ResourceLoader resourceLoader;
    private final QAClient qaClient;
    
    public EntrenamientoService(EntrenamientoRepository entrenamientoRepository, ResourceLoader resourceLoader, QAClient qaClient) {
        this.entrenamientoRepository = entrenamientoRepository;
        this.resourceLoader = resourceLoader;
        this.qaClient = qaClient;
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
    public void entrenarChatbot(){
        List<EntrenarDTO> listaEntrenamiento= findAll().stream().map(EntrenarDTO::new).toList();
        String respuesta = qaClient.train(listaEntrenamiento);
        System.out.println(respuesta);
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
