package com.ordersmarter.controller;

import com.ordersmarter.model.CartAnalysisResponse;
import com.ordersmarter.model.CartItem;
import com.ordersmarter.model.CartRequest;
import com.ordersmarter.service.CalorieService;
import com.ordersmarter.service.ScraperService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {
    private final ScraperService scraperService;
    private final CalorieService calorieService;

    public CartController(ScraperService scraperService, CalorieService calorieService) {
        this.scraperService = scraperService;
        this.calorieService = calorieService;
    }

    @PostMapping("/analyze-cart")
    public Mono<CartAnalysisResponse> analyzeCart(@RequestBody CartRequest request) {
        return scraperService.scrapeCart(request.getUrl())
                .flatMap(items -> calorieService.predictCalories(items))
                .map(items -> {
                    double totalCalories = items.stream()
                            .mapToDouble(item -> item.getCaloriesPer100g() * item.getQuantity())
                            .sum();
                    
                    return new CartAnalysisResponse(items, totalCalories);
                });
    }
} 