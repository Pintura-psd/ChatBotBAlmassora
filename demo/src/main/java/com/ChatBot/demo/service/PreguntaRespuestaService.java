package com.ChatBot.demo.service;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.repository.PreguntaRespuestaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreguntaRespuestaService {
    private final PreguntaRespuestaRepository preguntaRespuestaRepository;
    public PreguntaRespuestaService(PreguntaRespuestaRepository prRepo) {
        this.preguntaRespuestaRepository = prRepo;

    }

    //Crear el objeto pregunta respuesta
    public PreguntaRespuesta crearPreguntaRespuesta(PreguntaRespuesta preguntaRespuesta){
        return preguntaRespuestaRepository.save(preguntaRespuesta);
    }

    public List<PreguntaRespuesta> getPreguntaRespuestas(){
        return preguntaRespuestaRepository.findAll();
    }

    public PreguntaRespuesta updatePreguntaRespuesta(String id,PreguntaRespuesta pre) {
      pre.setId(id);
      return preguntaRespuestaRepository.save(pre);
    }
    public void deletePreguntaRespuesta(String id){
        preguntaRespuestaRepository.deleteById(id);
    }
}
