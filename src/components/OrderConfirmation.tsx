import React from 'react';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';

interface OrderConfirmationProps {
  onClose: () => void;
  itemCount: number;
  total: number;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onClose, itemCount, total }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center gap-5 animate-slide-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center shadow-inner">
          <CheckCircle className="w-14 h-14 text-green-500" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Order Placed Successfully! ✅
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Thank you for your purchase! Your order of{' '}
            <span className="font-semibold text-violet-600 dark:text-violet-400">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>{' '}
            totaling{' '}
            <span className="font-semibold text-violet-600 dark:text-violet-400">${total.toFixed(2)}</span>{' '}
            has been confirmed.
          </p>
        </div>

        {/* Summary card */}
        <div className="w-full bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400">Order Total</p>
            <p className="font-extrabold text-gray-900 dark:text-white text-lg">${total.toFixed(2)}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Items</p>
            <p className="font-bold text-gray-900 dark:text-white">{itemCount}</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base hover:shadow-lg hover:shadow-violet-400/40 active:scale-95 transition-all duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
