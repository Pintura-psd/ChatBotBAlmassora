package com.ChatBot.demo.dto;

import com.ChatBot.demo.model.QA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class entrenarDTO {
    private String prompt;
    private String response;

    public entrenarDTO(QA qa){
        this.prompt = qa.getPregunta();
        this.response = qa.getRespuesta();
    }

}
