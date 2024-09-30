package com.iso.Webshop.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    private Long id;
    private Long userId;
    private String description;
    private double total;
    private String date;
}
