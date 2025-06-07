export interface CartItem {
    name: string;
    quantity: number;
    price: number;
    person: string;
    caloriesPer100g: number;
}

export interface CartAnalysisResponse {
    items: CartItem[];
    totalCalories: number;
}

export interface CartRequest {
    url: string;
} 