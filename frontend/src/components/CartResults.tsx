import React from 'react';
import type { CartItem } from '../types';

interface CartResultsProps {
  items: CartItem[];
  totalCalories: number;
}

export const CartResults: React.FC<CartResultsProps> = ({ items, totalCalories }) => (
  <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 space-y-6 mt-8">
    <div className="grid grid-cols-4 gap-2 text-sm md:text-base font-semibold text-gray-500 pb-2 border-b">
      <div>Item</div>
      <div>Qty</div>
      <div>Price</div>
      <div>Calories</div>
    </div>
    {items.map((item, idx) => (
      <div className="py-3 md:py-4 grid grid-cols-4 gap-2 text-sm md:text-base items-center border-b last:border-b-0" key={idx}>
        <div className="text-[#1D1D1F] font-medium">
          {item.name}
          {item.person && (
            <span className="ml-2 text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5">{item.person}</span>
          )}
        </div>
        <div>{item.quantity}</div>
        <div>${item.price.toFixed(2)}</div>
        <div className={item.caloriesPer100g && item.caloriesPer100g > 400 ? 'text-red-600 font-semibold' : ''}>
          {item.caloriesPer100g ? item.caloriesPer100g.toFixed(2) : '-'}
        </div>
      </div>
    ))}
    <div className="pt-4 text-right text-xl md:text-2xl font-extrabold text-emerald-600">
      Total Calories: {Math.round(totalCalories)}
    </div>
  </div>
); 