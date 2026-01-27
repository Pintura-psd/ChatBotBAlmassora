package com.ChatBot.demo.dto;

public class QADTO {
    private String pregunta;
    private String respuesta;
    private Long tiempoRespuesta;
    public QADTO(String pregunta, String respuesta, Long tiempoRespuesta) {
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.tiempoRespuesta = tiempoRespuesta;
    }
}
