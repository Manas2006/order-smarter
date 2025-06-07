import { useState } from 'react';
import { CartForm } from './CartForm';
import { CartResults } from './CartResults';
import { ErrorMessage } from './ErrorMessage';
import { Loading } from './Loading';
import { analyzeCart } from '../services/api';
import type { CartAnalysisResponse } from '../types';

export default function CartAnalyzer() {
    const [results, setResults] = useState<CartAnalysisResponse | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (url: string) => {
        setLoading(true);
        setError('');
        setResults(null);
        try {
            const res = await analyzeCart(url);
            setResults(res);
        } catch (err) {
            setError('Failed to analyze cart. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl w-full mx-auto p-10 md:p-12 rounded-3xl shadow-2xl bg-white/80 backdrop-blur space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-4 text-center">Analyze Your Uber Eats Cart</h2>
            <CartForm onSubmit={handleAnalyze} loading={loading} />
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {results && <CartResults items={results.items} totalCalories={results.totalCalories} />}
        </div>
    );
} 