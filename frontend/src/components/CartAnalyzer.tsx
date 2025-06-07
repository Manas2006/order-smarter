import { useState } from 'react';
import { Header } from './Header';
import { CartForm } from './CartForm';
import { CartResults } from './CartResults';
import { ErrorMessage } from './ErrorMessage';
import { Loading } from './Loading';
import { analyzeCart } from '../services/api';
import type { CartAnalysisResponse } from '../types';

export function CartAnalyzer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<CartAnalysisResponse | null>(null);

    const handleAnalyze = async (url: string) => {
        setLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await analyzeCart(url);
            setAnalysis(result);
        } catch (err) {
            setError('Failed to analyze cart. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1D1D1F]">
            <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
                <Header />
                <CartForm onSubmit={handleAnalyze} loading={loading} />
                <ErrorMessage message={error} />
                {loading && <Loading />}
                {analysis && !loading && !error && (
                    <CartResults items={analysis.items} totalCalories={analysis.totalCalories} />
                )}
            </div>
        </div>
    );
} 