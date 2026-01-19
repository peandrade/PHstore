"use client";

import { useToastStore } from "@/store/toast";
import { useRouter } from "next/navigation";

export const ToastContainer = () => {
  const router = useRouter();
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[280px] p-4 rounded-lg shadow-lg animate-slide-in
            ${toast.type === "login" ? "bg-gray-900 text-white" : ""}
            ${toast.type === "success" ? "bg-green-600 text-white" : ""}
            ${toast.type === "error" ? "bg-red-600 text-white" : ""}
            ${toast.type === "info" ? "bg-blue-600 text-white" : ""}
          `}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>

              {toast.type === "login" && (
                <button
                  onClick={() => {
                    removeToast(toast.id);
                    router.push("/login");
                  }}
                  className="mt-2 w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
