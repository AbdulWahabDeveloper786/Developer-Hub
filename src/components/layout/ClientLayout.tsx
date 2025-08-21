'use client';

import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import FloatingElements from '@/components/ui/FloatingElements';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Always show loading animation on page load/refresh
    // Remove the session storage check to ensure preloader always shows
    setIsLoading(true);
    setShowContent(false);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return (
    <>
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      
      {showContent && (
        <>
          <FloatingElements />
          {children}
        </>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}