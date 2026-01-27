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
@Table(name="Entrenamiento")
public class Entrenamiento {
    public Entrenamiento(QA qa){
        this.prompt = qa.getPregunta();
        this.response = qa.getRespuesta();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("prompt")
    @Column(name = "prompt", nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @JsonProperty("response")
    @Column(name = "response", nullable = false, columnDefinition = "TEXT")
    private String response;


}