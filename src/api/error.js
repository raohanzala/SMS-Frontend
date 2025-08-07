// 'use client';

import React from 'react';
// import { useRouter } from 'next/navigation';
// import ClientLayout from './ClientLayout';

function Error() {
  // const router = useRouter();

  return (
    // <ClientLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <div className="mb-8 animate-bounce-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-slide-up">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 mb-8 animate-slide-up animation-delay-200">
          Don&apos;t worry, it&apos;s not you - it&apos;s us. We&apos;re working on fixing the problem.
        </p>

        <div className="space-y-4 animate-slide-up animation-delay-300">
          <button
            // onClick={() => router.refresh()}
            className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Try Again
          </button>
          
          <button
            // onClick={() => router.push('/')}
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 ml-0 sm:ml-4 mt-4 sm:mt-0"
          >
            Go to Homepage
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500 animate-slide-up animation-delay-400">
          <p>If the problem persists, please contact our support team.</p>
          <p className="mt-2">Error Code: 500</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
    // </ClientLayout>
  );
}

export default Error;