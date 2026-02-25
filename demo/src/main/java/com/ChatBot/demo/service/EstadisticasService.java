package com.ChatBot.demo.service;

import com.ChatBot.demo.client.QAClient;
import com.ChatBot.demo.dto.front.BarrasDTO;
import com.ChatBot.demo.dto.front.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.dto.chatApi.QueueDTO;
import com.ChatBot.demo.model.EstadoPregunta;
import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.repository.QARepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class EstadisticasService {

    private final QARepository QARepository;
    QAService QAService;
    QAClient qaclient;
    public EstadisticasService(QARepository QARepository, QAClient qaclient) {
        this.QARepository = QARepository;
        this.qaclient = qaclient;
    }

    // Top 5 preguntas última hora
    public List<PreguntaFrecuenciaDTO> top5UltimaHora() {
        LocalDateTime fin = LocalDateTime.now();
        LocalDateTime inicio = fin.minusHours(1);

        return QARepository.top5Preguntas(inicio, fin);

    }

    //Barras
    public BarrasDTO getBarras() {
        List<QA> listaDePreguntas = QARepository.findAll();
        BarrasDTO barrasDTO = new BarrasDTO();
        int[] numerosMeses = new int [12];

        listaDePreguntas.stream().map(QA::getFechaCreacion).forEach(f -> {
            int mes = f.getMonthValue()-1;
            numerosMeses[mes]++;
        });

        barrasDTO.setPreguntasMes(numerosMeses);

        return barrasDTO;
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
    public ResponseEntity<QueueDTO> queue(){

            return qaclient.getQueue();


    }
    public int preguntasRefused() {
        return (int) QARepository.findAll()
                .stream()
                .filter(qa -> EstadoPregunta.REFUSED.equals(qa.getEstado()))
                .count();
    }
    public int preguntasToTrain() {
        return (int) QARepository.findAll()
                .stream()
                .filter(qa -> EstadoPregunta.TO_TRAIN.equals(qa.getEstado()))
                .count();
    }

}

