import React from 'react';
import { ShoppingBag } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-5 py-16 px-6 text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 flex items-center justify-center shadow-inner">
        <ShoppingBag className="w-12 h-12 text-violet-400 dark:text-violet-500" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Your cart is empty</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm leading-relaxed max-w-xs mx-auto">
          Looks like you haven't added anything yet. Browse products and find something you love!
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
