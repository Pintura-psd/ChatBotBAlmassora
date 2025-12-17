package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.service.PreguntaRespuestaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;

import java.util.List;

@RestController
@RequestMapping("/api/preguntarespuesta")
public class PreguntaRespuestaController {
    private final PreguntaRespuestaService pregResp;


    public PreguntaRespuestaController(PreguntaRespuestaService pregResp){
        this.pregResp = pregResp;
    }

  //crear pregunta respuesta

     //obtener todas lasw preguntas
    @GetMapping
    public List<PreguntaRespuesta> obtenerPreguntas(){
        return pregResp.getPreguntaSinRespuesta();

    }

    @PostMapping("/chat")
    public String responderPregunta(@RequestBody String mensaje) {
        // Llama a tu servicio para buscar la respuesta correspondiente
        mensaje = mensaje.replaceAll("^\"|\"$", "");
       return pregResp.solicitarRespuesta(mensaje);
        // Si no encuentra la pregunta, devuelve mensaje por defecto
    }


    @GetMapping("/cargar")
    public String cargar() {
        try {
            // Cambia aquí a la ruta absoluta de tu archivo
            String rutaArchivo = "/home/hecencelb/Escritorio/ChatbotAlmazora/preguntas_chatbot.json";
            pregResp.cargarJsonEnBD(rutaArchivo);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error cargando JSON: " + e.getMessage();
        }
        return "JSON cargado correctamente";
    }




}
