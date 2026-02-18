package com.ChatBot.demo.repository;

import com.ChatBot.demo.dto.front.PreguntaFrecuenciaDTO;
import com.ChatBot.demo.model.QA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface QARepository extends JpaRepository<QA, Long> {
    @Query("""
        SELECT new com.ChatBot.demo.dto.front.PreguntaFrecuenciaDTO(q.pregunta, COUNT(q))
        FROM QA q
        WHERE q.fechaCreacion BETWEEN :inicio AND :fin
        GROUP BY q.pregunta
        ORDER BY COUNT(q) DESC
        LIMIT 5
        """)
    List<PreguntaFrecuenciaDTO> top5Preguntas(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
    @Query("""
        SELECT q
        FROM QA q
        WHERE LOWER(q.pregunta) LIKE LOWER(CONCAT('%', :texto, '%'))
           OR LOWER(q.respuesta) LIKE LOWER(CONCAT('%', :texto, '%'))
        """)
    List<QA> buscarPorTexto(@Param("texto") String texto);
}
