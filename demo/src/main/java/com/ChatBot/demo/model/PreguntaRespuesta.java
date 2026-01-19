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
public class PreguntaRespuesta {
    public PreguntaRespuesta(String pregunta) {
        this.pregunta = pregunta;
    }

    public PreguntaRespuesta(String pregunta, String respuesta, Long tiempoRespuesta, Boolean tieneRespuesta) {
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.tiempoRespuesta = tiempoRespuesta;
        this.tieneRespuesta = tieneRespuesta;
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

    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
    }

    @Column(name = "tiempo_respuesta")
    private Long tiempoRespuesta;

    @Column(name = "tiene_respuesta", nullable = false)
    private Boolean tieneRespuesta;

    public boolean hasRespuesta(){
        return respuesta != null;
    }
    public boolean hasPregunta(String pregunta){
        return pregunta != null && pregunta.equals(this.pregunta);
    }



}
