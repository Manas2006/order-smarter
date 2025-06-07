import axios from 'axios';
import type { CartAnalysisResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export async function analyzeCart(url: string): Promise<CartAnalysisResponse> {
    const response = await axios.post(`${API_BASE_URL}/api/analyze-cart`, { url });
    return response.data;
} 