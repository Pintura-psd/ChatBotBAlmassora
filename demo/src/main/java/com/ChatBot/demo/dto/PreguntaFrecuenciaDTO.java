package com.ChatBot.demo.dto;

public class PreguntaFrecuenciaDTO {

    private String pregunta;
    private Long repeticiones;

    public PreguntaFrecuenciaDTO(String pregunta, Long repeticiones) {
        this.pregunta = pregunta;
        this.repeticiones = repeticiones;
    }

}