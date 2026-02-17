package com.ChatBot.demo.dto.chatApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class QueueDTO {
    @JsonProperty("pending_jobs")
    private List<String> jobs;
    
    @JsonProperty("count")
    private int count;
}
