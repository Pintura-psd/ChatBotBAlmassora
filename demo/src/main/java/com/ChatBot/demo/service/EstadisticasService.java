package com.ChatBot.demo.service;

import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.model.QA;
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
    public int totalPreguntas() {
        return QARepository.findAll().size();
    }
    
    public int preguntasConRespuesta() {
        int preguntasConRespuesta=0;
        List<QA> preguntas = QARepository.findAll();
       for (QA pregunta : preguntas) {
           if (pregunta.getRespuesta() != null && !pregunta.getRespuesta().isBlank()) {
               preguntasConRespuesta++;
           }
       }
        return preguntasConRespuesta;
    }


}

