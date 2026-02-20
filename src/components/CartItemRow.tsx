import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemRowProps {
  item: CartItemType;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { dispatch } = useCart();

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 dark:border-gray-700/60 last:border-0 animate-fade-in">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
          {item.title}
        </h4>
        <p className="text-violet-600 dark:text-violet-400 font-bold text-sm mt-0.5">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: { id: item.id } })}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-150 active:scale-90"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
          </button>

          <span className="w-7 text-center font-bold text-gray-900 dark:text-white text-sm">
            {item.quantity}
          </span>

          <button
            onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: { id: item.id } })}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-150 active:scale-90"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Line total */}
          <span className="ml-auto font-extrabold text-gray-900 dark:text-white text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
        className="self-start p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150 active:scale-90"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItemRow;
