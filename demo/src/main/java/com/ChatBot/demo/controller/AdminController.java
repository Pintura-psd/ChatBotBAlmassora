package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.PreguntaRespuesta;
import com.ChatBot.demo.service.PreguntaRespuestaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class AdminController {
    private final PreguntaRespuestaService preguntaRespuestaService;

    public AdminController(PreguntaRespuestaService preguntaRespuestaService) {
        this.preguntaRespuestaService = preguntaRespuestaService;
    }

    @GetMapping("/admin")
    public List<PreguntaRespuesta> index(){
        return preguntaRespuestaService.getPreguntaSinRespuesta();
    }

    @PostMapping



}
