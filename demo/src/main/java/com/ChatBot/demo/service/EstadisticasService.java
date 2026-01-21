package com.ChatBot.demo.service;

import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class EstadisticasService {

    private final PreguntaRepository preguntaRepository;

    public EstadisticasService(PreguntaRepository preguntaRepository) {

        this.preguntaRepository = preguntaRepository;
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



}

