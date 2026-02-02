package com.ChatBot.demo.controller;

import com.ChatBot.demo.dto.EstadisticasDTO;
import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.service.EstadisticasService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/estadisticas")
public class EstadisticaPreguntasController {
    private final EstadisticasService service;

    public EstadisticaPreguntasController(EstadisticasService service) {
        this.service = service;
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


}

