package com.ChatBot.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf
                        // Deshabilitar CSRF para APIs públicas
                        .ignoringRequestMatchers("/api/chat_fast/**", "/api/chat/**")
                )
                .authorizeHttpRequests(auth -> auth
                        // Recursos públicos - PRIMERO
                        .requestMatchers("/", "/index.html", "/login", "/login/**").permitAll()
                        .requestMatchers("/static/**", "/assets/**").permitAll()
                        // APIs de chat - públicas sin autenticación
                        .requestMatchers("/api/chat_fast", "/api/chat", "/api/chat/**", "/api/chat_fast/**").permitAll()
                        // /menu requiere autenticación
                        .requestMatchers("/menu", "/admin", "/estadisticas").authenticated()
                        // Resto de APIs requieren autenticación
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth -> oauth
                        .loginPage("/login")
                        .defaultSuccessUrl("/menu", true)
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/").permitAll()
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
