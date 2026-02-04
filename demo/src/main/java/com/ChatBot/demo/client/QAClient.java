package com.ChatBot.demo.client;

import com.ChatBot.demo.dto.EntrenarDTO;
import com.ChatBot.demo.dto.QueueDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;


@HttpExchange("https://chatbot.valenciainformada.com/api/")
public interface QAClient {

    @PostExchange("/chat")
    Answer getRespuesta(@RequestBody Map<String, String> request);

    @PostExchange(value="/train/team1" , contentType = MediaType.APPLICATION_JSON_VALUE,
            headers ={ "Authorization=Basic ZXF1aXBvMTpwYXNzMQ=="
    }
    )
    String train(@RequestBody List<EntrenarDTO> request);

    @GetExchange ("/train/queue")
    QueueDTO getQueue();

}
