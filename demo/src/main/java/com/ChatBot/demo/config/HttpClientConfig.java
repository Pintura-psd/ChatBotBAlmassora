package com.ChatBot.demo.config;


import com.ChatBot.demo.client.QAClient;
import com.ChatBot.demo.client.QAFastClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.service.registry.ImportHttpServices;

@Configuration
@ImportHttpServices(basePackages = "com.ChatBot.demo.client", types = {QAClient.class, QAFastClient.class})
public class HttpClientConfig {
}
