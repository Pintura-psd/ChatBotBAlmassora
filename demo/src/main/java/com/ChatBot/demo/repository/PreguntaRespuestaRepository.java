package com.ChatBot.demo.repository;

import com.ChatBot.demo.model.PreguntaRespuesta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreguntaRespuestaRepository extends JpaRepository<PreguntaRespuesta, String> {
}
