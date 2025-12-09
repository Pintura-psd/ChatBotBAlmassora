package com.ChatBot.demo.service;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PreguntaRespuestaService {
    private final PreguntaRepository preguntaRespuestaRepository;
    public PreguntaRespuestaService(PreguntaRepository prRepo) {
        this.preguntaRespuestaRepository = prRepo;

    }

    //Crear el objeto pregunta respuesta
    public PreguntaRespuesta crearPreguntaRespuesta(PreguntaRespuesta preguntaRespuesta){
        return preguntaRespuestaRepository.save(preguntaRespuesta);
    }

    public List<PreguntaRespuesta> getPreguntaRespuestas(){
        List<PreguntaRespuesta> listaPreguntas = new ArrayList<>();
        listaPreguntas=preguntaRespuestaRepository.findAll();
        List<PreguntaRespuesta> listaLimpia = listaPreguntas.stream().filter(PreguntaRespuesta::hasRespuesta).toList();
        return listaPreguntas;
    }

    public String solicitarRespuesta(String mensaje) {

        return "Espabila";
    }
}
