package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.service.PreguntaRespuestaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class AdminController {
    private final PreguntaRespuestaService preguntaRespuestaService;

    public AdminController(PreguntaRespuestaService preguntaRespuestaService) {
        this.preguntaRespuestaService = preguntaRespuestaService;
    }

    @GetMapping("/admin")
    public List<QA> index(){

        List<QA> preguntaSinRespuesta = preguntaRespuestaService.getPreguntaSinRespuesta();
        System.out.println(preguntaSinRespuesta);
        return preguntaSinRespuesta;
    }



}
