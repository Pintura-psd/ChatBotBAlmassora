package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.service.QAService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final QAService qaService;


    public ApiController(QAService qaService){
        this.qaService = qaService;
    }

  //crear pregunta respuesta

     //obtener todas lasw preguntas
    @GetMapping
    public List<QA> obtenerPreguntas(){
        return qaService.getPreguntaSinRespuesta();

    }

    @PostMapping("/chat")
    public String responderPregunta(@RequestBody String mensaje) {
        // Llama a tu servicio para buscar la respuesta correspondiente
        mensaje = mensaje.replaceAll("^\"|\"$", "");
       return qaService.getRespuesta(mensaje);
        // Si no encuentra la pregunta, devuelve mensaje por defecto
    }

    @GetMapping("/admin")
    public List<QA> index(){

        List<QA> preguntaSinRespuesta = qaService.getPreguntaSinRespuesta();
        System.out.println(preguntaSinRespuesta);
        return preguntaSinRespuesta;
    }

    @PatchMapping
    public ResponseEntity<QA> actualizarRespuesta(@RequestBody QA QA) {
        try {
            qaService.updateRespuesta(QA);
            return ResponseEntity.ok(QA);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }

//    @GetMapping("/cargar")
//    public String cargar() {
//        try {
//            // Cambia aquí a la ruta absoluta de tu archivo
//            String rutaArchivo = "/home/hecencelb/Escritorio/ChatbotAlmazora/preguntas_chatbot.json";
//            pregResp.cargarJsonEnBD(rutaArchivo);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error cargando JSON: " + e.getMessage();
//        }
//        return "JSON cargado correctamente";
//    }




}
