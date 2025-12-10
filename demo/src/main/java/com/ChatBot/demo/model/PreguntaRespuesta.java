package com.ChatBot.demo.model;

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
    @Column(name= "respuesta")
    private String respuesta;

    @Column(name= "pregunta", nullable = false, unique = true)
    private String pregunta;

    public boolean hasRespuesta(){
        return respuesta != null;
    }
    public boolean hasPregunta(String pregunta){
        return pregunta != null && pregunta.equals(this.pregunta);
    }

}
