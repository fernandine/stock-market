package com.ativosfinanceiros.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeSeries implements Serializable {

    @JsonProperty("1. open")
    private String openingPrice;
    @JsonProperty("2. high")
    private String highPrice;
    @JsonProperty("3. low")
    private String lowPrice;
    @JsonProperty("4. close")
    private String closingPrice;
    @JsonProperty("5. volume")
    private String volume;
}
