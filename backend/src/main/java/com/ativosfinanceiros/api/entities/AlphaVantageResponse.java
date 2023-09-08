package com.ativosfinanceiros.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlphaVantageResponse implements Serializable {

    @JsonProperty("Meta Data")
    private MetaData metaData;
    @JsonProperty("Time Series (Daily)")
    private Map<String, TimeSeries> timeSeries;
}
