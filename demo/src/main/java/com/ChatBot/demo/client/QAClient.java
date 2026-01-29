package com.ChatBot.demo.client;

import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

@HttpExchange("https://chatbot.valenciainformada.com/api/")
public interface QAClient {

    @PostExchange("/chat")
    Map<String, Object> getRespuesta(@RequestBody Map<String, String> request);

}
