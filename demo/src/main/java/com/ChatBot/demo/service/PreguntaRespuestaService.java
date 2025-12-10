package com.ChatBot.demo.service;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PreguntaRespuestaService {
    private final PreguntaRepository preguntaRespuestaRepository;
    private List<PreguntaRespuesta> preguntaRespuestas = new ArrayList<>();

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

    public boolean preguntaExiste(String texto){
        for (PreguntaRespuesta preguntaRespuesta : preguntaRespuestas) {
            if (preguntaRespuesta.getPregunta().equals(texto)) {
                return true;
            }
        }
        return false;
    }

    public String solicitarRespuesta(String mensaje) {
        if (preguntaExiste(mensaje)) {
            for (PreguntaRespuesta preguntaRespuesta : preguntaRespuestas) {
                if (preguntaRespuesta.getPregunta().equals(mensaje)) {
                    if (preguntaRespuesta.hasRespuesta()) {
                        return preguntaRespuesta.getRespuesta();
                    }
                }
            }
        }else{
            crearPreguntaRespuesta(mensaje);
        }
        return "No tenemos respuesta para esa pregunta";
    }
}
