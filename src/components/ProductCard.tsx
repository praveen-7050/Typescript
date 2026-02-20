import React, { useState } from 'react';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOrderNow: (product: Product) => void;
  onToast: (message: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block w-4 h-4">
            <Star className="w-4 h-4 text-gray-200 dark:text-gray-700 fill-current" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : '50%' }}
              >
                <Star className="w-4 h-4 text-amber-400 fill-current" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderNow, onToast }) => {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdding(true);
    onToast(`${product.title} added to cart!`);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <article className="group relative flex flex-col bg-white dark:bg-gray-800/70 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/40 border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1.5 animate-slide-up">
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow">
          {product.badge}
        </span>
      )}

      {/* Category */}
      <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full text-xs font-medium bg-black/30 backdrop-blur-sm text-white">
        {product.category}
      </span>

      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700/50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
          {product.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-sm font-semibold text-amber-500">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price + Buttons */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-sm border-2 border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 active:scale-95 transition-all duration-200 ${
              adding ? 'scale-95 opacity-70' : ''
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {adding ? 'Added!' : 'Add to Cart'}
          </button>

          <button
            onClick={() => onOrderNow(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-400/40 active:scale-95 transition-all duration-200"
          >
            <Zap className="w-4 h-4" />
            Order Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
