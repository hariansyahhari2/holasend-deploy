package com.enigmacamp.api.holasend.models.entitymodels.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DateRangeRequest {

    private String after = "2021-01-01";

    private String before = LocalDateTime.now().plusDays(1).toString().substring(0, 10);
}
