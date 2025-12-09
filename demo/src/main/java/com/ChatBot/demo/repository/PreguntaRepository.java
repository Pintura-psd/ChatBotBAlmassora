package com.ChatBot.demo.repository;

import com.ChatBot.demo.model.PreguntaRespuesta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreguntaRepository extends JpaRepository<PreguntaRespuesta, Long> {

}
