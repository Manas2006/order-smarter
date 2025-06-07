package com.ordersmarter.model;

import lombok.Data;

@Data
public class CartItem {
    private String name;
    private int quantity;
    private double price;
    private String person;
    private double caloriesPer100g;
} 