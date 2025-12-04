package com.ChatBot.demo.model;

import lombok.*;

import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "PreguntasRespuestas")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class PreguntaRespuesta {

    private String respuesta;
    private String pregunta;
}
