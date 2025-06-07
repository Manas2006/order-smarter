import React, { useState } from 'react';

interface CartFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export const CartForm: React.FC<CartFormProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidUrl = (val: string) =>
    /^https:\/\/eats\.uber\.com\/group-orders\//.test(val.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValidUrl(url)) return;
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 space-y-6">
      <div>
        <input
          type="text"
          className={`h-12 md:h-14 text-base md:text-lg px-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90 ${touched && !isValidUrl(url) ? 'border-red-400' : ''}`}
          placeholder="https://eats.uber.com/group-orders/..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={loading}
        />
        {touched && !isValidUrl(url) && (
          <div className="text-red-500 text-xs mt-1">Please enter a valid Uber Eats group order URL.</div>
        )}
      </div>
      <button
        type="submit"
        className="h-12 md:h-14 w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white text-base md:text-lg font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading || !url || !isValidUrl(url)}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Analyzing...
          </span>
        ) : (
          'Analyze Cart'
        )}
      </button>
    </form>
  );
}; 