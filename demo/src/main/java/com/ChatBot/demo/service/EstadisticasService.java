package com.ChatBot.demo.service;

import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.repository.QARepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class EstadisticasService {

    private final QARepository QARepository;

    public EstadisticasService(QARepository QARepository) {
        this.QARepository = QARepository;
    }

    // Top 5 preguntas última hora
    public List<PreguntaFrecuenciaDTO> top5UltimaHora() {
        LocalDateTime fin = LocalDateTime.now();
        LocalDateTime inicio = fin.minusHours(1);

        return QARepository.top5Preguntas(inicio, fin)
                .stream()
                .map(r -> new PreguntaFrecuenciaDTO(
                        (String) r[0],
                        ((Number) r[1]).longValue()
                ))
                .toList();
    }



}

