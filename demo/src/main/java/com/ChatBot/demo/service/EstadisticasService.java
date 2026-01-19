package com.ChatBot.demo.service;

import com.ChatBot.demo.dto.EstadisticasDTO;
import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.model.Estadisticas;
import com.ChatBot.demo.repository.EstadisticasRepository;
import com.ChatBot.demo.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class EstadisticasService {

    private final EstadisticasRepository estadisticasRepository;
    private final PreguntaRepository preguntaRepository;

    public EstadisticasService(EstadisticasRepository estadisticasRepository,
                               PreguntaRepository preguntaRepository) {
        this.estadisticasRepository = estadisticasRepository;
        this.preguntaRepository = preguntaRepository;
    }

    // Totales
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

    public void anyadirEstadisticas(Boolean tieneRespuesta) {
        Estadisticas e = getEstadisticas();
        if (tieneRespuesta) {
            e.setPreguntasBien(e.getPreguntasBien() + 1);
        } else {
            e.setPreguntasSinRespuesta(e.getPreguntasSinRespuesta() + 1);
        }
        e.setPreguntas(e.getPreguntas() + 1);
        estadisticasRepository.save(e);
    }

    // Top 5 preguntas última hora
    public List<PreguntaFrecuenciaDTO> top5UltimaHora() {
        LocalDateTime fin = LocalDateTime.now();
        LocalDateTime inicio = fin.minusHours(1);

        return preguntaRepository.top5Preguntas(inicio, fin)
                .stream()
                .map(r -> new PreguntaFrecuenciaDTO(
                        (String) r[0],
                        ((Number) r[1]).longValue()
                ))
                .toList();
    }

    // Totales + top 5
    public EstadisticasDTO obtenerEstadisticasCompletas() {
        Estadisticas e = getEstadisticas();

        List<PreguntaFrecuenciaDTO> top5 = top5UltimaHora();

        return new EstadisticasDTO(
                e.getPreguntas(),
                e.getPreguntasBien(),
                e.getPreguntasSinRespuesta(),
                top5
        );
    }
}

