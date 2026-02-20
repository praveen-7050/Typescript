import React from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartOpen }) => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              LunarStore
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Cart Button */}
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:shadow-violet-400/40 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 flex items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg animate-badge-pop"
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
