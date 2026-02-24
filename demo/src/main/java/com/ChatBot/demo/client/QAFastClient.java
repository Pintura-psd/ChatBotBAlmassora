package com.ChatBot.demo.client;

import com.ChatBot.demo.dto.chatApi.FastChatAnswerDTO;
import com.ChatBot.demo.dto.chatApi.FastChatDTO;
import com.ChatBot.demo.dto.chatApi.FastResponseDTO;
import com.ChatBot.demo.dto.chatApi.FastTrainingDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange("https://chatbot.valenciainformada.com/api_fast/")
public interface QAFastClient {
    @PostExchange("/chat")
    FastChatAnswerDTO getRespuestaFast(@RequestBody FastChatDTO request);

    @PostExchange(value="/train/team1" , contentType = MediaType.APPLICATION_JSON_VALUE,
            headers = { "Authorization=Basic dGVhbTE6dGVhbTE="
            }
    )
    FastResponseDTO train(@RequestBody FastTrainingDTO request);
}
