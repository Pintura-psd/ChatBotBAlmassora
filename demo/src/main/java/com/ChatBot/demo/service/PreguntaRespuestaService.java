package com.ChatBot.demo.service;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.repository.PreguntaRespuestaRepository;
import org.springframework.stereotype.Service;

@Service
public class PreguntaRespuestaService {
    private final PreguntaRespuestaRepository preguntaRespuestaRepository;
    public PreguntaRespuestaService(PreguntaRespuestaRepository prRepo) {
        this.preguntaRespuestaRepository = prRepo;

    }

}
