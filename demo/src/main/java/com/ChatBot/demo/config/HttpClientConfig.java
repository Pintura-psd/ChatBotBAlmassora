package com.ChatBot.demo.config;


import com.ChatBot.demo.client.QAClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.service.registry.ImportHttpServices;

@Configuration
@ImportHttpServices(basePackages = "com.ChatBot.demo.client", types = {QAClient.class})
public class HttpClientConfig {
}
