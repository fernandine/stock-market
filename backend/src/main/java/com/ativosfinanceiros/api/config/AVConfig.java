package com.ativosfinanceiros.api.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@ConfigurationProperties(prefix = "alphavantage.api.key")
public class AVConfig {

    private String apiKey;

}

