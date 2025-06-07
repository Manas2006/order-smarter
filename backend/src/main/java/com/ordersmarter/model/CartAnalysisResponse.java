package com.ordersmarter.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartAnalysisResponse {
    private List<CartItem> items;
    private double totalCalories;
} 