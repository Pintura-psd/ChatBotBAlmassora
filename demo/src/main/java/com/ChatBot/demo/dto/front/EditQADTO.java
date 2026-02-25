package com.ChatBot.demo.dto.front;

import com.ChatBot.demo.model.EstadoPregunta;
import lombok.Data;

@Data
public class EditQADTO {
    private Long id;
    private String prompt;
    private String response;
    private EstadoPregunta estado;
}
