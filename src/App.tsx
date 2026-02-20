import React, { useState, useCallback } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import OrderConfirmation from './components/OrderConfirmation';
import Toast from './components/Toast';
import ProductsPage from './pages/ProductsPage';
import type { Product } from './types';

interface ToastItem {
  id: string;
  message: string;
}

const AppContent: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<{ itemCount: number; total: number } | null>(null);
  const { grandTotal, totalItems, dispatch } = useCart();

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToast = useCallback((message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleOrderNow = useCallback(
    (product: Product) => {
      dispatch({ type: 'ADD_ITEM', payload: product });
      setOrderInfo({ itemCount: 1, total: product.price });
      setCartOpen(false);
    },
    [dispatch]
  );

  const handlePurchase = useCallback(() => {
    setOrderInfo({ itemCount: totalItems, total: grandTotal });
    dispatch({ type: 'CLEAR_CART' });
    setCartOpen(false);
  }, [totalItems, grandTotal, dispatch]);

  const handleOrderClose = useCallback(() => {
    setOrderInfo(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar onCartOpen={openCart} />

      <ProductsPage onOrderNow={handleOrderNow} onToast={addToast} />

      <CartDrawer isOpen={cartOpen} onClose={closeCart} onPurchase={handlePurchase} />

      {orderInfo && (
        <OrderConfirmation
          onClose={handleOrderClose}
          itemCount={orderInfo.itemCount}
          total={orderInfo.total}
        />
      )}

      {/* Toast container */}
      <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
