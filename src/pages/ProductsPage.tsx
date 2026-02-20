import React from 'react';
import type { Product } from '../types';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  onOrderNow: (product: Product) => void;
  onToast: (message: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onOrderNow, onToast }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="text-center mb-12 animate-fade-in">
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-semibold mb-4">
          New Arrivals 🔥
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Premium Tech{' '}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            Essentials
          </span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Discover the latest and greatest in personal technology. Curated picks for enthusiasts and professionals.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <ProductCard
              product={product}
              onOrderNow={onOrderNow}
              onToast={onToast}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
