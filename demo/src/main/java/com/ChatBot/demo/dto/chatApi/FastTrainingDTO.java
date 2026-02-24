package com.ChatBot.demo.dto.chatApi;

import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.model.QA;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FastTrainingDTO {
    @JsonProperty("instruction")
    private String prompt;
    @JsonProperty("imput")
    private String input;
    @JsonProperty("response")
    private String response;

    public FastTrainingDTO(QA entrenamiento){
        this.prompt = entrenamiento.getRespuesta();
        this.input="";
        this.response = entrenamiento.getRespuesta();
    }
}
