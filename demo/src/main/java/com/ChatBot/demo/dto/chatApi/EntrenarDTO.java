package com.ChatBot.demo.dto.chatApi;

import com.ChatBot.demo.model.Entrenamiento;
import com.ChatBot.demo.model.QA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EntrenarDTO {
    private String prompt;
    private String response;

    public EntrenarDTO(QA qa){
        this.prompt = qa.getPregunta();
        this.response = qa.getRespuesta();
    }
    public EntrenarDTO(Entrenamiento entrenamiento){
        this.prompt = entrenamiento.getPrompt();
        this.response = entrenamiento.getResponse();
    }

}
