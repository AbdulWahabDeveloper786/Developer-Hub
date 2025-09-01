'use client';

import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import FloatingElements from '@/components/ui/FloatingElements';
import useMobile from '@/hooks/useMobile';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const isMobile = useMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Skip loading animation on mobile devices for better performance
    if (isMobile) {
      setIsLoading(false);
      setShowContent(true);
    } else {
      // Show loading animation on desktop
      setIsLoading(true);
      setShowContent(false);
    }
  }, [isMobile]);

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