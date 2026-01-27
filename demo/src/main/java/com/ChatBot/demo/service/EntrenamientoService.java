package com.ChatBot.demo.service;

import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.repository.EntrenamientoRepository;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
public class EntrenamientoService {
    private final EntrenamientoRepository entrenamientoRepository;
    public EntrenamientoService(EntrenamientoRepository entrenamientoRepository) {
        this.entrenamientoRepository = entrenamientoRepository;
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
    public void cargarJsonEnBD(String rutaArchivo) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            // Leemos todas las líneas del archivo
            List<String> lineas = Files.readAllLines(Path.of(rutaArchivo));

            for (String linea : lineas) {
                if (linea.trim().isEmpty()) continue;

                // Convertimos cada línea en objeto Entrenamiento
                Entrenamiento entrenamiento = mapper.readValue(linea, Entrenamiento.class);

                // Guardamos en la base de datos
                entrenamientoRepository.save(entrenamiento);
            }


        } catch (Exception e) {
            e.printStackTrace();
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
