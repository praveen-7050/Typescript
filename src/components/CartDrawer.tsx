import React, { useEffect, useRef } from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItemRow from './CartItemRow';
import EmptyCart from './EmptyCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onPurchase }) => {
  const { cartItems, grandTotal, totalItems, dispatch } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 h-full z-50 w-full sm:w-96 flex flex-col bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-350 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({totalItems} item{totalItems !== 1 ? 's' : ''})
                </span>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                aria-label="Clear all items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 scrollbar-thin">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-5 py-5 space-y-4 bg-gray-50 dark:bg-gray-800/50">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal ({totalItems} items)</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="font-bold text-gray-900 dark:text-white text-lg">Grand Total</span>
                <span className="font-extrabold text-violet-600 dark:text-violet-400 text-xl">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Purchase button */}
            <button
              onClick={onPurchase}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base shadow-lg hover:shadow-violet-400/40 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              Purchase · ${grandTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
