package com.ChatBot.demo.controller;

import com.ChatBot.demo.dto.BarrasDTO;
import com.ChatBot.demo.dto.EstadisticasDTO;
import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.dto.RespuestaEntrenamientoDTO;
import com.ChatBot.demo.service.EntrenamientoService;
import com.ChatBot.demo.service.EstadisticasService;
import com.ChatBot.demo.service.QAService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5176")
@RestController
@RequestMapping("/estadisticas")
public class EstadisticaPreguntasController {
    private final QAService qAservice;
    private final EstadisticasService service;
    private final EntrenamientoService entrenamientoService;

    public EstadisticaPreguntasController(QAService qAservice, EstadisticasService service, EntrenamientoService entrenamientoService) {
        this.qAservice = qAservice;
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
        return qAservice.getPreguntaSinRespuesta().size();
    }
    @GetMapping("/preguntasConRespuesta")
    public int preguntasConRespuesta(){
        return service.preguntasConRespuesta();
    }

    @GetMapping
    public EstadisticasDTO getEstadisticas() {
        int total = service.totalPreguntas();
        int bien = service.preguntasConRespuesta();
        int sinRespuesta = qAservice.getPreguntaSinRespuesta().size();
        List<PreguntaFrecuenciaDTO> top5 = service.top5UltimaHora();
        int count = service.queue();
        return new EstadisticasDTO(total, bien, sinRespuesta, top5, count);
    }

    @PostMapping("/entrenar")
    public ResponseEntity<RespuestaEntrenamientoDTO> entrenar(){
        return entrenamientoService.entrenarChatbot();
    }

    @GetMapping("/barras")
    public ResponseEntity<BarrasDTO> barras(){
        try {
            return ResponseEntity.ok(service.getBarras());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

