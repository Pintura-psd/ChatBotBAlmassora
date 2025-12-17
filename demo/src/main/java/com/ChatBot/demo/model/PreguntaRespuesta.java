package com.ChatBot.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;


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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("response")
    @Column(name= "respuesta",columnDefinition = "TEXT")
    private String respuesta;

    @JsonProperty("prompt")
    @Column(name= "pregunta", nullable = false, unique = true,columnDefinition = "TEXT")
    private String pregunta;

    public boolean hasRespuesta(){
        return respuesta != null;
    }
    public boolean hasPregunta(String pregunta){
        return pregunta != null && pregunta.equals(this.pregunta);
    }

}
