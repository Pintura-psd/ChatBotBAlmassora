package com.ChatBot.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FastChatAnswerDTO {
    @JsonProperty("request_id")
    private String requestId;
    @JsonProperty("latency_ms")
    private long latencyMs;
    @JsonProperty("text")
    private String text;
    @JsonProperty("rag_hits")
    private int ragHits;
}
