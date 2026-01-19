package com.ChatBot.demo.service;

import com.ChatBot.demo.model.Estadisticas;
import com.ChatBot.demo.repository.EstadisticasRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstadisticasService {
    private final EstadisticasRepository estadisticasRepository;
    public EstadisticasService(EstadisticasRepository estadisticasRepository) {
        this.estadisticasRepository = estadisticasRepository;
    }
    public Estadisticas getEstadisticas() {
        return estadisticasRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    Estadisticas e = new Estadisticas();
                    e.setPreguntas(0);
                    e.setPreguntasBien(0);
                    e.setPreguntasSinRespuesta(0);
                    return estadisticasRepository.save(e);
                });
    }
    public Estadisticas getPreguntaById(Long id) {
        return estadisticasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con id " + id));
    }
    public Estadisticas saveEstadisticas(Estadisticas estadisticas) {
        return estadisticasRepository.save(estadisticas);
    }

    public void anyadirEstadisticas(Boolean boleano) {
        Estadisticas e =getEstadisticas();
        if (boleano) {
            e.setPreguntasBien(e.getPreguntasBien() + 1);
        }else{
            e.setPreguntasSinRespuesta(e.getPreguntasSinRespuesta() + 1);
        }
        e.setPreguntas(e.getPreguntas()+1);
        estadisticasRepository.save(e);
    }
}
