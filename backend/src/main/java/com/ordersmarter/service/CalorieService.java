package com.ordersmarter.service;

import com.ordersmarter.model.CartItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class CalorieService {
    private final WebClient webClient;

    public CalorieService(@Value("${calorie.service.url:http://localhost:8001}") String baseUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public Mono<List<CartItem>> predictCalories(List<CartItem> items) {
        List<String> itemNames = new ArrayList<>();
        for (CartItem item : items) {
            itemNames.add(item.getName());
        }
        
        Map<String, List<String>> requestBody = new HashMap<>();
        requestBody.put("items", itemNames);

        return webClient.post()
                .uri("/predict/batch")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, List<Map<String, Object>>>>() {})
                .map(response -> {
                    List<Map<String, Object>> predictions = response.get("predictions");
                    for (int i = 0; i < items.size(); i++) {
                        Map<String, Object> prediction = predictions.get(i);
                        items.get(i).setCaloriesPer100g(((Number) prediction.get("calories_per_100g")).doubleValue());
                    }
                    return items;
                });
    }
} 