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
    //actualizar pregunta respuesta
    @PutMapping("/{id}")
    public PreguntaRespuesta update(@PathVariable String id, @RequestBody PreguntaRespuesta preg){
        return pregResp.updatePreguntaRespuesta(id,preg);
    }
    //Borrar pregunta respuesta
    @DeleteMapping("/{id}")
    public void eliminarPreguntaRespuesta(@PathVariable String id){
        pregResp.deletePreguntaRespuesta(id);
    }
}
