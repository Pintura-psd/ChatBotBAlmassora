package com.ChatBot.demo.dto;

import com.ChatBot.demo.model.Entrenamiento;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FastTrainingDTO {
    @JsonProperty("instruction")
    private String prompt;
    @JsonProperty("imput")
    private String input;
    @JsonProperty("response")
    private String response;

    public FastTrainingDTO(Entrenamiento entrenamiento){
        this.prompt = entrenamiento.getPrompt();
        this.input="";
        this.response = entrenamiento.getResponse();
    }
}
