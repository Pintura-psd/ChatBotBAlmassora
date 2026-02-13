package com.ChatBot.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FastResponseDTO {
    @JsonProperty("status")
    private String status;
    @JsonProperty("file")
    private String file;
    @JsonProperty("detail")
    private String detail;

}
