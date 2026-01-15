package com.ChatBot.demo.repository;

import com.ChatBot.demo.model.Estadisticas;
import com.ChatBot.demo.model.PreguntaRespuesta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadisticasRepository extends JpaRepository<Estadisticas, Long> {

}

