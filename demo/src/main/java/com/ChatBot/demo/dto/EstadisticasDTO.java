package com.ChatBot.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EstadisticasDTO {
    private int totalPreguntas ;
    private int preguntasBien;
    private int preguntasSinRespuesta;
    private List<PreguntaFrecuenciaDTO> top5Preguntas;


    public EstadisticasDTO(int total, int bien, int sinRespuesta, List<PreguntaFrecuenciaDTO> top5) {
        this.totalPreguntas = total;
        this.preguntasBien = bien;
        this.preguntasSinRespuesta = sinRespuesta;
        this.top5Preguntas = top5;

    }
}
