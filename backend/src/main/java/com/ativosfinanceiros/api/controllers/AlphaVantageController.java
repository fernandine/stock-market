package com.ativosfinanceiros.api.controllers;

import com.ativosfinanceiros.api.entities.AlphaVantageResponse;
import com.ativosfinanceiros.api.services.AlphaVantageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/stocks")
@CrossOrigin(origins = "http://localhost:4200")
public class AlphaVantageController {

    @Autowired
    private AlphaVantageService service;

    @GetMapping
    public ResponseEntity<AlphaVantageResponse> getStockData(
            @RequestParam String function,
            @RequestParam String symbol

    ) {
        AlphaVantageResponse response = service.getStockData(function,symbol);
        return ResponseEntity.ok(response);
    }
}
