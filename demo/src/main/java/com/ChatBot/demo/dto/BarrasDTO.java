package com.ChatBot.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BarrasDTO {

    private int[] preguntasMes= new int[12];

}
