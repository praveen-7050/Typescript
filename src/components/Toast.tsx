import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), 2800);
    const removeTimer = setTimeout(() => onClose(), 3100);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl px-4 py-3 min-w-[280px] max-w-xs transition-all duration-300 ${
        visible ? 'animate-toast-in' : 'animate-toast-out opacity-0'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="w-5 h-5 text-green-500" />
      </div>
      <p className="text-gray-800 dark:text-gray-100 text-sm font-medium flex-1 leading-tight">
        {message}
      </p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
