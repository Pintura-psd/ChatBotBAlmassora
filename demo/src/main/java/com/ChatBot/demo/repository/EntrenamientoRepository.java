package com.ChatBot.demo.repository;

import com.ChatBot.demo.model.Entrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrenamientoRepository extends JpaRepository<Entrenamiento, Long> {
}
