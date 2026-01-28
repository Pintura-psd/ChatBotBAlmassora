package com.ChatBot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AlmassoraBChatBotApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlmassoraBChatBotApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedOrigins("http://localhost:5173", "http://localhost:3000")
					.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
					.allowedHeaders("*")
					.allowCredentials(true);
			}

			@Override
			public void addResourceHandlers(ResourceHandlerRegistry registry) {
			// Serve static resources only from /static/**
			registry.addResourceHandler("/static/**")
				.addResourceLocations("classpath:/static/");
			}

		};
	}
}