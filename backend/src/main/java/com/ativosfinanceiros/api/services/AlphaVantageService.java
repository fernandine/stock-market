package com.ativosfinanceiros.api.services;

import com.ativosfinanceiros.api.entities.AlphaVantageResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AlphaVantageService {

    @Value("${alphavantage.api.key}")
    private String apiKey;

    private final WebClient.Builder webClientBuilder;

    @Autowired
    public AlphaVantageService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @Transactional(readOnly = true)
    public Mono<AlphaVantageResponse> getStockData(String function, String symbol) {
        String apiUrl = "https://www.alphavantage.co/query?function=" + function + "&symbol=" + symbol + "&apikey="
         + apiKey;

        return webClientBuilder.baseUrl(apiUrl)
                .build()
                .get()
                .retrieve()
                .bodyToMono(AlphaVantageResponse.class);
    }
}

