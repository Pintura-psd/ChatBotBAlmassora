package com.ChatBot.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {

    @GetMapping({"/", "/menu", "/edit", "/estadisticas", "/login"})
    public String index(){
        return "forward:/index.html";
    }

    // Captura rutas dinámicas
    @GetMapping("/{path:^(?!api|static|error).*}")
    public String redirectToIndex(@PathVariable String path) {
        return "forward:/index.html";
    }

    // Captura rutas profundas
    @GetMapping("/{path:^(?!api|static|error).*}/**")
    public String redirectToIndexDeep(@PathVariable String path) {
        return "forward:/index.html";
    }
}
