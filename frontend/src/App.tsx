import { Header } from './components/Header';
import { CartForm } from './components/CartForm';
import { CartResults } from './components/CartResults';
import { ErrorMessage } from './components/ErrorMessage';
import { Loading } from './components/Loading';
import { useState } from 'react';
import { analyzeCart } from './services/api';
import type { CartAnalysisResponse } from './types';

function App() {
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
    <div className="flex items-start justify-center min-h-screen">
      <main className="max-w-lg w-full mx-auto p-6 flex flex-col gap-6 mt-8">
        <Header />
        <CartForm onSubmit={handleAnalyze} loading={loading} />
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {results && <CartResults items={results.items} totalCalories={results.totalCalories} />}
      </main>
    </div>
  );
}

export default App;
