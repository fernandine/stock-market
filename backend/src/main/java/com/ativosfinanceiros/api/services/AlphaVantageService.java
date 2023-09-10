package com.ativosfinanceiros.api.services;

import com.ativosfinanceiros.api.config.AVConfig;
import com.ativosfinanceiros.api.entities.AlphaVantageResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AlphaVantageService {
    @Value("${alphavantage.api.key}")
    private String apiKey;
    @Autowired
    private AVConfig config;
    private final WebClient.Builder webClientBuilder;

    @Autowired
    public AlphaVantageService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @Transactional(readOnly = true)
    public Mono<AlphaVantageResponse> getStockData(String function, String symbol) {
        String apiKey = config.getApiKey();
        String apiUrl = "https://www.alphavantage.co/query?function=" + function + "&symbol=" + symbol + "&apikey=demo";
        // + apiKey;

        return webClientBuilder.baseUrl(apiUrl)
                .build()
                .get()
                .retrieve()
                .bodyToMono(AlphaVantageResponse.class);
    }
}

