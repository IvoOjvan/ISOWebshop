package com.iso.Webshop.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    private Long id;
    private String name;
    private Double price;
    private String brand;
    //private int amount;
    private String description;
}
