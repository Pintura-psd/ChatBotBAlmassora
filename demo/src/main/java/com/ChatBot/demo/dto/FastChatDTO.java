package com.ChatBot.demo.dto;

import lombok.Data;

@Data
public class FastChatDTO {
    private String prompt;
    private String system;
    private Integer max_new_tokens;
    private Double temperature;
    private Double top_p;
    private Boolean rag;
}
