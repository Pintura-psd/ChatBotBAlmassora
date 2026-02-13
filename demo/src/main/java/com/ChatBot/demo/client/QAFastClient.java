package com.ChatBot.demo.client;

import com.ChatBot.demo.dto.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

import java.util.List;

@HttpExchange("https://chatbot.valenciainformada.com/api_fast/")
public interface QAFastClient {
    @PostExchange("/chat")
    FastChatAnswerDTO getRespuestaFast(@RequestBody FastChatDTO request);

    @PostExchange(value="/train/team1" , contentType = MediaType.APPLICATION_JSON_VALUE,
            headers = { "Authorization=Basic dGVhbTE6dGVhbTE="
            }
    )
    ResponseEntity<FastResponseDTO> train(@RequestBody FastTrainingDTO request);
}
