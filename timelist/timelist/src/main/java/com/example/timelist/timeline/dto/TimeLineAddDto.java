package com.example.timelist.timeline.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class TimeLineAddDto {
    @Column(name = "account_key")
    private Long accountKey;

    private String title;
    private String subTitle;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_day")
    private LocalDate startDay;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_day")
    private LocalDate endDay;
}

