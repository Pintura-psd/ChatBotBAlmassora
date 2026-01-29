package com.ChatBot.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Data
//@Document(collection = "PreguntasRespuestas")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name="pregunta_respuesta")
public class QA {
    public QA(String pregunta) {
        this.pregunta = pregunta;
    }

    public QA(String pregunta, String respuesta, Long tiempoRespuesta) {
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.tiempoRespuesta = tiempoRespuesta;

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("response")
    @Column(name= "respuesta",columnDefinition = "TEXT")
    private String respuesta;

    @JsonProperty("prompt")
    @Column(name= "pregunta", nullable = false ,columnDefinition = "TEXT")
    private String pregunta;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "tiempo_respuesta")
    private Long tiempoRespuesta;



    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public boolean hasRespuesta(){
     return !respuesta.isBlank();

    }




}
