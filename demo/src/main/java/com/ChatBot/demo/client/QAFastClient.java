package com.ChatBot.demo.client;

import com.ChatBot.demo.dto.FastChatAnswerDTO;
import com.ChatBot.demo.dto.FastChatDTO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange("https://chatbot.valenciainformada.com/api_fast/")
public interface QAFastClient {
    @PostExchange("/chat")
    FastChatAnswerDTO getRespuestaFast(@RequestBody FastChatDTO request);
}
