package com.ChatBot.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String index(){
        return "chatBotVentana.html";
    }
    @GetMapping("/admin")
    public String admin(){
        return "index.html";
    }

}
