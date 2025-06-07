package com.ordersmarter.service;

import com.ordersmarter.model.CartItem;
import com.ordersmarter.model.CartRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class ScraperService {
    private static final Logger logger = LoggerFactory.getLogger(ScraperService.class);
    private final WebClient webClient;
    private final WebClient calorieWebClient;
    private final ObjectMapper objectMapper;

    public ScraperService(@Value("${scraper.service.url:http://localhost:8000}") String baseUrl,
                          @Value("${calorie.model.url:http://localhost:8001}") String calorieBaseUrl) {
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
        this.calorieWebClient = WebClient.builder().baseUrl(calorieBaseUrl).build();
        this.objectMapper = new ObjectMapper();
    }

    public Mono<List<CartItem>> scrapeCart(String url) {
        CartRequest request = new CartRequest();
        request.setUrl(url);
        return webClient.post()
                .uri("/scrape")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> logger.info("Raw scraper response: {}", response))
                .flatMap(response -> {
                    try {
                        Map<String, Object> responseMap = objectMapper.readValue(response, new TypeReference<Map<String, Object>>() {});
                        List<Map<String, Object>> items = (List<Map<String, Object>>) responseMap.get("items");
                        List<CartItem> cartItems = new ArrayList<>();
                        for (Map<String, Object> item : items) {
                            CartItem cartItem = new CartItem();
                            cartItem.setName((String) item.get("name"));
                            cartItem.setQuantity(((Number) item.get("quantity")).intValue());
                            cartItem.setPrice(((Number) item.get("price")).doubleValue());
                            cartItem.setPerson((String) item.get("person"));
                            cartItems.add(cartItem);
                        }
                        return fetchCaloriePredictions(cartItems);
                    } catch (Exception e) {
                        logger.error("Error deserializing response: {}", e.getMessage());
                        throw new RuntimeException(e);
                    }
                });
    }

    private Mono<List<CartItem>> fetchCaloriePredictions(List<CartItem> cartItems) {
        List<String> itemNames = new ArrayList<>();
        for (CartItem item : cartItems) {
            itemNames.add(item.getName());
        }
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("items", itemNames);
        return calorieWebClient.post()
                .uri("/predict/batch")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> logger.info("Calorie prediction response: {}", response))
                .flatMap(response -> {
                    try {
                        Map<String, Object> predictionMap = objectMapper.readValue(response, new TypeReference<Map<String, Object>>() {});
                        List<Map<String, Object>> predictions = (List<Map<String, Object>>) predictionMap.get("predictions");
                        for (int i = 0; i < cartItems.size(); i++) {
                            Map<String, Object> prediction = predictions.get(i);
                            cartItems.get(i).setCaloriesPer100g(((Number) prediction.get("calories_per_100g")).doubleValue());
                        }
                        return Mono.just(cartItems);
                    } catch (Exception e) {
                        logger.error("Error deserializing calorie prediction response: {}", e.getMessage());
                        throw new RuntimeException(e);
                    }
                });
    }
} 