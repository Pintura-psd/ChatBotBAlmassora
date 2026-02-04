package com.ChatBot.demo.repository;

import com.ChatBot.demo.dto.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.model.QA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface QARepository extends JpaRepository<QA, Long> {
    @Query(value = """
        SELECT pregunta, COUNT(*) AS total
        FROM pregunta_respuesta
        WHERE fecha_creacion BETWEEN :inicio AND :fin
        GROUP BY pregunta
        ORDER BY total DESC
        LIMIT 5
    """, nativeQuery = true)
    List<PreguntaFrecuenciaDTO> top5Preguntas(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
}
