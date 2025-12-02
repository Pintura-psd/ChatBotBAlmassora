package com.ChatBot.demo.model;

import jakarta.persistence.Id;
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
@Id
    private String id;
    private String respuesta;
    private String pregunta;
}
