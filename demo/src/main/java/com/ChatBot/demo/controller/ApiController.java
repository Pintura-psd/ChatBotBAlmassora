package com.ChatBot.demo.controller;

import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.model.QA;
import com.ChatBot.demo.service.EntrenamientoService;
import com.ChatBot.demo.service.QAService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class ApiController {
    private final QAService qaService;
    private final EntrenamientoService entrenamientoService;

    public ApiController(QAService qaService, EntrenamientoService entrenamientoService){
        this.qaService = qaService;
        this.entrenamientoService = entrenamientoService;
    }

     
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

    @PostMapping("/chat_fast")
    public ResponseEntity<String> responderPreguntaFast(@RequestBody String mensaje) {
       try{
           mensaje = mensaje.replaceAll("^\"|\"$", "");
           return ResponseEntity.ok(qaService.getRespuestaFast(mensaje));

       }catch(Exception e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    @GetMapping("/admin")
    public List<QA> index(){
        List<QA> preguntaSinRespuesta = qaService.getPreguntaSinRespuesta();
        System.out.println(preguntaSinRespuesta);
        return preguntaSinRespuesta;
    }

    @PatchMapping("/")
    public ResponseEntity<QA> actualizarRespuesta(@RequestBody QA qa) {
        try {
            entrenamientoService.save(new Entrenamiento(qaService.updateRespuesta(qa)));
            return ResponseEntity.ok(qa);
        }catch (Exception e){
            System.err.println("Error al actualizar respuesta: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPregunta(@PathVariable Long id) {
        try {
            qaService.deletePregunta(id);
            return ResponseEntity.ok("Pregunta eliminada correctamente");
        } catch (Exception e) {
            System.err.println("Error al eliminar pregunta: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al eliminar la pregunta: " + e.getMessage());
        }
    }

    @GetMapping("/cargar")
    public String cargar() {
        try {
            // Carga el archivo desde el classpath (src/main/resources/)
            entrenamientoService.cargarJsonEnBD("preguntas_chatbot.jsonl");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error cargando JSON: " + e.getMessage();
        }
        return "JSON cargado correctamente";
    }
    @GetMapping("/search/{query}")
    public ResponseEntity<List<QA>> obtenerPregunta(@PathVariable String query) {
        try{
           return ResponseEntity.ok(qaService.searchPreguntas(query));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }

}
