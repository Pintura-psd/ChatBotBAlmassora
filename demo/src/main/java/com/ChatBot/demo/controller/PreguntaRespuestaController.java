package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.service.PreguntaRespuestaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/preguntarespuesta")
public class PreguntaRespuestaController {
    private final PreguntaRespuestaService pregResp;


    public PreguntaRespuestaController(PreguntaRespuestaService pregResp){
        this.pregResp = pregResp;
    }

  //crear pregunta respuesta
    @PostMapping
    public PreguntaRespuesta crear(@RequestBody PreguntaRespuesta preg){
        return pregResp.crearPreguntaRespuesta(preg);
    }

     //obtener todas lasw preguntas
    @GetMapping
    public List<PreguntaRespuesta> obtenerPreguntas(){
        return pregResp.getPreguntaRespuestas();
    }

    @PostMapping("/chat")
    public String responderPregunta(@RequestBody String mensaje) {
        // Llama a tu servicio para buscar la respuesta correspondiente
       String respuesta =pregResp.solicitarRespuesta(mensaje);
        // Si no encuentra la pregunta, devuelve mensaje por defecto
        return respuesta != null ? respuesta : "Lo siento, no entiendo la pregunta.";
    }

}
