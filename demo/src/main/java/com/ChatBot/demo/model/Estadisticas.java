package com.ChatBot.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name="estadisticas")
public class Estadisticas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "preguntas")
    private int preguntas;

    @Column(name = "preguntasBien")
    private int preguntasBien;

    @Column(name = "preguntasSinRespuesta")
    private int preguntasSinRespuesta;

}
