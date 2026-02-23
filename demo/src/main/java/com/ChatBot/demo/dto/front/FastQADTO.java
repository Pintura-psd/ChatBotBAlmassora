package com.ChatBot.demo.dto.front;

import com.ChatBot.demo.model.EstadoPregunta;
import com.ChatBot.demo.model.QA;
import lombok.Data;

@Data
public class FastQADTO {
    private Long id;
    private String prompt;
    private String response;
    private boolean trained;
    public FastQADTO(QA fastQA) {
        this.id = fastQA.getId();
        this.prompt = fastQA.getPregunta();
        this.response = fastQA.getRespuesta();
        this.trained = fastQA.getEstado().equals(EstadoPregunta.TRAINED);
    }
}
