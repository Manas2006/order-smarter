import React from 'react';

export const Header: React.FC = () => (
  <header className="mb-8 text-center">
    <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 drop-shadow-md">
      Uber Eats Calorie Estimator
    </h1>
    <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl mx-auto">
      Paste your Uber Eats group order URL to analyze the calorie content
    </p>
  </header>
); 