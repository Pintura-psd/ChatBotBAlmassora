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
    public PreguntaRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name= "respuesta")
    private String respuesta;

    @Column(name= "pregunta", nullable = false)
    private String pregunta;

    public boolean hasRespuesta(){
        return respuesta != null;
    }
    public boolean hasPregunta(String pregunta){
        return pregunta != null && pregunta.equals(this.pregunta);
    }

}
