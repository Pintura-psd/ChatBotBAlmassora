package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.service.QAService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class AdminController {
    private final QAService QAService;

    public AdminController(QAService QAService) {
        this.QAService = QAService;
    }

    @GetMapping("/admin")
    public List<QA> index(){

        List<QA> preguntaSinRespuesta = QAService.getPreguntaSinRespuesta();
        System.out.println(preguntaSinRespuesta);
        return preguntaSinRespuesta;
    }



}
