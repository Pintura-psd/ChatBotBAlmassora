package com.ChatBot.demo.controller;

import com.ChatBot.demo.dto.EntrenarDTO;
import com.ChatBot.demo.dto.EstadisticasDTO;
import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.service.EntrenamientoService;
import com.ChatBot.demo.service.EstadisticasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/estadisticas")
public class EstadisticaPreguntasController {
    private final EstadisticasService service;
    private final EntrenamientoService entrenamientoService;

    public EstadisticaPreguntasController(EstadisticasService service, EntrenamientoService entrenamientoService) {
        this.service = service;
        this.entrenamientoService = entrenamientoService;
    }

    @GetMapping("/preguntasfrecuentes")
    public List<PreguntaFrecuenciaDTO> getPreguntasFrecuentes(){
        return service.top5UltimaHora();
    }
    @GetMapping("/totalpreguntas")
    public int totalPreguntas(){
        return service.totalPreguntas();
    }
    @GetMapping("/preguntasSinRespuesta")
    public int preguntasSinRespuesta(){
        return service.preguntasSinRespuesta();
    }
    @GetMapping("/preguntasConRespuesta")
    public int preguntasConRespuesta(){
        return service.preguntasConRespuesta();
    }

    @PostMapping("/entrenar")
    public ResponseEntity<Void> entrenar(){
    entrenamientoService.entrenarChatbot();
    return ResponseEntity.ok().build();
    }
}

