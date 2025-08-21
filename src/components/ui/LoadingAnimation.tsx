'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete?: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState('Loading');
  const [isCompleted, setIsCompleted] = useState(false);

  const loadingTexts = ['Loading', 'Initializing', 'Setting up', 'Almost Ready', 'Complete'];

  // Generate floating particles with consistent positions
  const particles = useMemo(() => {
    // Use fixed positions to avoid hydration mismatch
    const fixedPositions = [
      { x: 30.23, y: 38.35, delay: 0.5 },
      { x: 36.85, y: 72.65, delay: 1.2 },
      { x: 21.74, y: 94.70, delay: 0.8 },
      { x: 39.80, y: 1.71, delay: 1.5 },
      { x: 28.25, y: 6.45, delay: 0.3 },
      { x: 10.81, y: 33.82, delay: 1.8 },
      { x: 67.51, y: 69.83, delay: 0.9 },
      { x: 52.38, y: 63.16, delay: 1.1 },
      { x: 86.34, y: 20.10, delay: 0.7 },
      { x: 64.83, y: 57.05, delay: 1.4 },
      { x: 48.28, y: 4.88, delay: 0.6 },
      { x: 7.65, y: 87.13, delay: 1.6 },
      { x: 85.14, y: 57.01, delay: 0.4 },
      { x: 62.77, y: 45.57, delay: 1.3 },
      { x: 48.50, y: 80.53, delay: 1.0 }
    ];
    
    return fixedPositions.map((pos, i) => ({
      id: i,
      x: pos.x,
      y: pos.y,
      delay: pos.delay,
    }));
  }, []);

  useEffect(() => {
    const progressInterval: NodeJS.Timeout = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsCompleted(true);
          setCurrentText('Complete');
          
          // Wait for completion animation, then hide
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onComplete?.();
            }, 800);
          }, 1500);
          
          return 100;
        }
        
        // Smooth progression that guarantees reaching 100%
        const increment = prev < 30 ? Math.random() * 8 + 3 :
                         prev < 60 ? Math.random() * 6 + 2 :
                         prev < 90 ? Math.random() * 4 + 1 :
                         prev < 98 ? Math.random() * 2 + 0.5 :
                         100 - prev; // Ensure we reach exactly 100%
        
        return Math.min(prev + increment, 100);
      });
    }, 80);

    // Text animation
    const textInterval: NodeJS.Timeout = setInterval(() => {
      setCurrentText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        if (currentIndex < loadingTexts.length - 1) {
          return loadingTexts[currentIndex + 1];
        }
        return prev;
      });
    }, 1000);



    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete, loadingTexts]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(8,249,255,0.03)_25px,rgba(8,249,255,0.03)_26px,transparent_27px,transparent_74px,rgba(8,249,255,0.03)_75px,rgba(8,249,255,0.03)_76px,transparent_77px),linear-gradient(rgba(8,249,255,0.03)_24px,transparent_25px,transparent_26px,rgba(8,249,255,0.03)_27px,rgba(8,249,255,0.03)_74px,transparent_75px,transparent_76px,rgba(8,249,255,0.03)_77px)]" />
          </div>

          {/* Floating Particles Background */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-[#08f9ff] rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + particle.delay,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Loading Content */}
          <div className="relative z-10 text-center">
            {/* Main Loader Container */}
            <motion.div
              className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 sm:mb-12"
              animate={{ 
                rotate: isCompleted ? 0 : 360,
                scale: isCompleted ? 1.2 : 1
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: isCompleted ? 0 : Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
            >
              {/* Outer Ring */}
              <motion.div 
                className="absolute inset-0 border-4 border-gray-700 rounded-full"
                animate={{
                  borderColor: isCompleted ? "#10b981" : "#374151",
                  boxShadow: isCompleted ? 
                    "0 0 30px rgba(16,185,129,0.6)" : 
                    "0 0 20px rgba(8,249,255,0.3)"
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              />
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke={isCompleted ? "#10b981" : "#08f9ff"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={377}
                  strokeDashoffset={377 - (progress * 377) / 100}
                  className="transition-all duration-300 ease-out"
                  style={{
                    filter: isCompleted ? 
                      "drop-shadow(0 0 15px rgba(16,185,129,0.8))" :
                      "drop-shadow(0 0 10px rgba(8,249,255,0.8))"
                  }}
                />
              </svg>
              
              {/* Center Icon */}
              <motion.div
                className="absolute inset-4 bg-gradient-to-br from-[#08f9ff] via-[#0066cc] to-[#08f9ff] rounded-full flex items-center justify-center"
                animate={{ 
                  background: isCompleted ?
                    "linear-gradient(45deg, #10b981, #059669)" :
                    "linear-gradient(45deg, #08f9ff, #0066cc)",
                  scale: isCompleted ? [1, 1.1, 1] : 1
                }}
                transition={{
                  background: { duration: 0.5 },
                  scale: { duration: 0.6, repeat: isCompleted ? 3 : 0 }
                }}
              >
                <motion.div
                  className="text-lg sm:text-2xl text-white font-bold"
                  animate={{ 
                    rotate: isCompleted ? 0 : -360
                  }}
                  transition={{
                    rotate: {
                      duration: 4,
                      repeat: isCompleted ? 0 : Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  {isCompleted ? "✓" : "💻"}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.h2
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                color: isCompleted ? "#10b981" : "#ffffff"
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8 px-4"
            >
              {currentText}
            </motion.h2>

            {/* Progress Bar */}
            <div className="w-80 sm:w-96 mx-auto mb-6 px-4 sm:px-0">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400 font-medium">Progress</span>
                <motion.span 
                  className="text-sm font-bold"
                  animate={{
                    color: isCompleted ? "#10b981" : "#08f9ff"
                  }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              
              <div className="relative h-2 sm:h-3 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700">
                <motion.div
                  className="h-full rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progress}%`,
                    background: isCompleted ?
                      "linear-gradient(90deg, #10b981, #059669)" :
                      "linear-gradient(90deg, #08f9ff, #0066cc)"
                  }}
                  transition={{ 
                    width: { duration: 0.3, ease: "easeOut" },
                    background: { duration: 0.5 }
                  }}
                >
                  {/* Progress bar shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: isCompleted ? 0 : Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Completion Message */}
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 text-base sm:text-lg font-semibold px-4"
              >
                🚀 Ready to Launch!
              </motion.div>
            )}

            {/* Success Burst Effect */}
            {isCompleted && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-3 h-3 bg-green-400 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: "-6px",
                      marginTop: "-6px"
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [1, 0.8, 0],
                      x: Math.cos((i * 45 * Math.PI) / 180) * 120,
                      y: Math.sin((i * 45 * Math.PI) / 180) * 120
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                      delay: 0.1
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}