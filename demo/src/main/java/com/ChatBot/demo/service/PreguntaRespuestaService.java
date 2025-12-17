package com.ChatBot.demo.service;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.repository.PreguntaRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PreguntaRespuestaService {
    private final PreguntaRepository preguntaRespuestaRepository;
    private List<PreguntaRespuesta> preguntaRespuestas = new ArrayList<>();
    private final RestTemplate restTemplate = new RestTemplate();

    public PreguntaRespuestaService(PreguntaRepository prRepo) {
        this.preguntaRespuestaRepository = prRepo;
        preguntaRespuestas =prRepo.findAll();
    }

    //Crear el objeto pregunta respuesta
    public PreguntaRespuesta crearPreguntaRespuesta(PreguntaRespuesta preguntaRespuesta){
        return preguntaRespuestaRepository.save(preguntaRespuesta);
    }
    public void crearPreguntaRespuesta(String preguntaRespuesta){
        PreguntaRespuesta pregunta = new PreguntaRespuesta(preguntaRespuesta);
        preguntaRespuestaRepository.save(pregunta);
    }

    public List<PreguntaRespuesta> getPreguntaSinRespuesta(){
        return preguntaRespuestas.stream().filter(preguntaRespuesta -> !preguntaRespuesta.hasRespuesta()).toList();
    }


    public String solicitarRespuesta(String mensaje) {
       try{
           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_JSON);

           Map<String, Object> body = Map.of(
                   "question", mensaje
           );

           HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

           ResponseEntity<Map> response = restTemplate.postForEntity("https://chatbot.valenciainformada.com/api/chat", request, Map.class);

           Map<String, Object> responseBody = response.getBody();

           String respuesta = responseBody.get("answer").toString();
           if(respuesta.equals("No consta en el dataset.")){
               crearPreguntaRespuesta(mensaje);
           }

           return respuesta;

       }catch (Exception e){
         return e.toString();
       }

    }
    public void cargarJsonEnBD(String rutaArchivo) {
        ObjectMapper mapper = new ObjectMapper();
        try (BufferedReader br = new BufferedReader(new FileReader(rutaArchivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                if (linea.trim().isEmpty()) continue;
                PreguntaRespuesta pr = mapper.readValue(linea, PreguntaRespuesta.class);

                // Guardar en BD
                preguntaRespuestaRepository.save(pr);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
