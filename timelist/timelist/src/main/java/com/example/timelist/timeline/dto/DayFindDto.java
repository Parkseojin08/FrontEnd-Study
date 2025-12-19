package com.example.timelist.timeline.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class DayFindDto {
    private LocalDate start_day;
    private LocalDate end_day;
}
