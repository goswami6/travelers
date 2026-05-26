import React, { useEffect } from 'react';
import { X, CheckCircle2, Info } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div className="glass-panel border border-slate-200/50 border-l-4 border-l-cyan-500 flex items-center justify-between rounded-xl px-4 py-3.5 shadow-xl text-slate-900 animate-slide-up">
      <div className="flex items-center space-x-3">
        <CheckCircle2 className="text-cyan-600 shrink-0" size={20} />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-slate-400 hover:text-slate-650 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
