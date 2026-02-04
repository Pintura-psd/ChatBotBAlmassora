package com.ChatBot.demo.dto;

import java.util.List;

public record QueueDTO(List<String> jobs, int count) {
}
