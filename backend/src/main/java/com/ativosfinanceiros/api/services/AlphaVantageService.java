package com.ativosfinanceiros.api.services;

import com.ativosfinanceiros.api.config.AVConfig;
import com.ativosfinanceiros.api.entities.AlphaVantageResponse;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class AlphaVantageService {
    private final AVConfig config;
    private final RestTemplate restTemplate;

    public AlphaVantageService(AVConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    @Transactional(readOnly = true)
    public AlphaVantageResponse getStockData(String function, String symbol) {
        String apiKey = config.getApiKey();
        String apiUrl = "https://www.alphavantage.co/query?function=" + function + "&symbol=" + symbol + "&apikey=demo";
//        // Informações de paginação
//        apiUrl += "&page=" + pageable.getPageNumber();
//        apiUrl += "&size=" + pageable.getPageSize();
//        apiUrl += "&sort=" + pageable.getSort();

        ResponseEntity<AlphaVantageResponse> response = restTemplate.getForEntity(apiUrl, AlphaVantageResponse.class);
        return response.getBody();
    }
}
