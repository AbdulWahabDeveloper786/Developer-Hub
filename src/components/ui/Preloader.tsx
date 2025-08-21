'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing DevHub');
  const [isMounted, setIsMounted] = useState(false);

  const loadingTexts = [
    'Initializing DevHub',
    'Loading Developer Tools',
    'Preparing Resources',
    'Setting up Playground',
    'Almost Ready'
  ];

  // Ensure component mounts properly
  useEffect(() => {
    setIsMounted(true);
    // Reset states on mount to ensure fresh start
    setIsLoading(true);
    setProgress(0);
    setLoadingText('Initializing DevHub');
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Fast and smooth loading progression
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200); // Even faster exit
          return 100;
        }
        // Faster, smoother progression
        const increment = prev < 50 ? Math.random() * 20 + 8 : 
                         prev < 85 ? Math.random() * 12 + 4 : 
                         Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 40); // Even faster updates

    // Faster text changes
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 400); // Much faster text changes

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isMounted, loadingTexts]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(8,249,255,0.03)_25px,rgba(8,249,255,0.03)_26px,transparent_27px,transparent_74px,rgba(8,249,255,0.03)_75px,rgba(8,249,255,0.03)_76px,transparent_77px),linear-gradient(rgba(8,249,255,0.03)_24px,transparent_25px,transparent_26px,rgba(8,249,255,0.03)_27px,rgba(8,249,255,0.03)_74px,transparent_75px,transparent_76px,rgba(8,249,255,0.03)_77px)] bg-[size:100px_100px]" />
          </div>

          {/* Floating Particles Background */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#08f9ff] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: 1,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          <div className="text-center relative z-10">
            {/* Main Loader Container */}
            <motion.div
              className="relative w-40 h-40 mx-auto mb-12"
              animate={{ 
                rotate: 360,
                filter: progress > 90 ? "hue-rotate(180deg)" : "hue-rotate(0deg)"
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: 2,
                  ease: "linear"
                },
                filter: {
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Outer Glow Ring */}
              <motion.div 
                className="absolute inset-0 border-4 border-gray-800 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(8,249,255,0.3)",
                    "0 0 40px rgba(8,249,255,0.6)",
                    "0 0 20px rgba(8,249,255,0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: 2,
                  ease: "easeInOut"
                }}
              />
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="75"
                  fill="none"
                  stroke="#08f9ff"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={471}
                  strokeDashoffset={471 - (progress * 471) / 100}
                  className="transition-all duration-500 ease-out drop-shadow-[0_0_10px_rgba(8,249,255,0.8)]"
                />
              </svg>
              
              {/* Inner Spinning Elements */}
              <motion.div
                className="absolute inset-6 bg-gradient-to-br from-[#08f9ff] via-[#0066cc] to-[#08f9ff] rounded-full flex items-center justify-center"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.05, 1],
                  background: [
                    "linear-gradient(45deg, #08f9ff, #0066cc)",
                    "linear-gradient(135deg, #0066cc, #08f9ff)",
                    "linear-gradient(225deg, #08f9ff, #0066cc)",
                    "linear-gradient(315deg, #0066cc, #08f9ff)"
                  ]
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: 2,
                    ease: "linear"
                  },
                  scale: {
                    duration: 1.5,
                    repeat: 2,
                    ease: "easeInOut"
                  },
                  background: {
                    duration: 4,
                    repeat: 1,
                    ease: "linear"
                  }
                }}
              >
                <motion.div
                  className="text-3xl text-black font-bold"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 4,
                      repeat: 1,
                      ease: "linear"
                    },
                    scale: {
                      duration: 1,
                      repeat: 2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  💻
                </motion.div>
              </motion.div>

              {/* Orbiting Elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-[#08f9ff] rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-6px",
                    marginTop: "-6px"
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((i * 120 * Math.PI) / 180) * 90,
                    y: Math.sin((i * 120 * Math.PI) / 180) * 90
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: 2,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>

            {/* Loading Text with Glitch Effect */}
            <motion.div
              className="text-[#08f9ff] text-2xl font-bold mb-6 relative"
              animate={{ 
                opacity: [0.8, 1, 0.8],
                textShadow: [
                  "0 0 10px rgba(8,249,255,0.5)",
                  "0 0 20px rgba(8,249,255,0.8)",
                  "0 0 10px rgba(8,249,255,0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: 2,
                ease: "easeInOut"
              }}
            >
              <motion.span
                key={loadingText}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {loadingText}
              </motion.span>
              
              {/* Glitch overlay */}
              <motion.span
                className="absolute inset-0 text-red-500 opacity-20"
                animate={{
                  x: [0, 2, -2, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 0.1,
                  repeat: 3,
                  repeatDelay: 3
                }}
              >
                {loadingText}
              </motion.span>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <div className="w-80 h-3 bg-gray-800/50 rounded-full overflow-hidden mx-auto mb-4 border border-gray-700">
              <motion.div
                className="h-full bg-gradient-to-r from-[#08f9ff] via-[#00ccff] to-[#0066cc] rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Progress bar glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: 2,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>

            {/* Enhanced Progress Percentage */}
            <motion.div
              className="text-white text-3xl font-mono font-bold mb-4 relative"
              key={Math.floor(progress)}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(8,249,255,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ 
                duration: 0.3,
                textShadow: {
                  duration: 1.5,
                  repeat: 2,
                  ease: "easeInOut"
                }
              }}
            >
              <span className="bg-gradient-to-r from-[#08f9ff] to-[#00ccff] bg-clip-text text-transparent">
                {Math.floor(progress)}%
              </span>
              
              {/* Percentage completion effect */}
              {progress === 100 && (
                <motion.div
                  className="absolute inset-0 text-green-400"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: 3,
                    ease: "easeInOut"
                  }}
                >
                  ✓ READY
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${10 + i * 6}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  background: i % 3 === 0 ? '#08f9ff' : i % 3 === 1 ? '#00ccff' : '#0066cc'
                }}
                animate={{
                  y: [0, -30 - Math.random() * 20, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.3, 1.2, 0.3],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: 1,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}

            {/* Success Animation */}
            {progress === 100 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="text-6xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: 2,
                    ease: "easeInOut"
                  }}
                >
                  🚀
                </motion.div>
              </motion.div>
            )}

            {/* Completion Burst Effect */}
            {progress === 100 && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-4 h-4 bg-[#08f9ff] rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: "-8px",
                      marginTop: "-8px"
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [1, 0.8, 0],
                      x: Math.cos((i * 45 * Math.PI) / 180) * 150,
                      y: Math.sin((i * 45 * Math.PI) / 180) * 150
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.2
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
};

export default Preloader;