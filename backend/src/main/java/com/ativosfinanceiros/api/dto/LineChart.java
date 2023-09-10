package com.ativosfinanceiros.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record LineChart(
        @JsonProperty("value") String volume) {
}
