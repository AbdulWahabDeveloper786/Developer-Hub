'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import ScrollReveal from '@/components/ui/ScrollReveal';
import useMobile from '@/hooks/useMobile';

// Dynamic import for Typed.js to reduce initial bundle size
const loadTyped = () => import('typed.js').then(mod => mod.default);

const HeroSection = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useMobile();

  useEffect(() => {
    let typed: InstanceType<typeof import('typed.js').default> | null = null;
    
    const initTyped = async () => {
      if (typedRef.current) {
        const Typed = await loadTyped();
        typed = new Typed(typedRef.current, {
          strings: [
            'All-in-One Developer Hub',
            'Code Generators & Tools',
            'API Documentation',
            'Cheat Sheets & Guides',
            'Resource Collections',
            'Developer Utilities',
            'Everything You Need'
          ],
          typeSpeed: isMobile ? 70 : 50, // Slower on mobile for better performance
          backSpeed: isMobile ? 50 : 30,
          backDelay: isMobile ? 2000 : 1500,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    };

    initTyped();
    
    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, [isMobile]);

  // Disable mouse tracking on mobile for better performance
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);



  const starVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 90, 180],
      transition: {
        duration: 3,
        repeat: 2,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <section id="home" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/hero-bg.png"
          alt="Hero Background"
          fill
          className="object-cover object-center sm:object-top md:object-center opacity-20 transition-all duration-300"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          quality={90}
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1, 
          delay: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Main Heading */}
          <motion.div
            className="mb-6 sm:mb-8 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-[#08f9ff] glow-text">DevHub</span>
              <br />
              <span className="text-white">For </span>
              <span className="text-[#08f9ff] glow-text">Developers</span>
            </h1>
          </motion.div>
          
          {/* Typing Animation */}
          <motion.div 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#08f9ff] min-h-[30px] sm:min-h-[40px] md:min-h-[50px] mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span ref={typedRef}></span>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
Your one-stop destination for everything development! No more endless Google searches - 
            find all the tools, resources, documentation, and utilities you need in one place. 
            Built by developers, for developers, with love for our community.
          </motion.p>

          {/* Feature Highlights */}
          <ScrollReveal direction="scale" delay={0.2}>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-10 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
            {[
              { icon: '🔧', label: 'Dev Tools', desc: 'Code generators' },
              { icon: '📚', label: 'Resources', desc: 'Docs & guides' },
              { icon: '🔍', label: 'Search', desc: 'Find anything' },
              { icon: '⚡', label: 'Libraries', desc: 'Frameworks & libs' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative text-center p-4 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-white/20 hover:border-[#08f9ff]/70 transition-all duration-300 group overflow-hidden"
                whileHover={isMobile ? {} : { 
                  scale: 1.02, 
                  y: -2
                }}
                transition={isMobile ? {} : { 
                  duration: 0.2,
                  type: "tween",
                  ease: "easeOut"
                }}
              >
                {/* Simplified Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#08f9ff]/10 via-transparent to-[#0066cc]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Container */}
                <motion.div 
                  className="relative z-10 text-3xl mb-3"
                  whileHover={isMobile ? {} : {
                    scale: 1.1
                  }}
                  transition={isMobile ? {} : {
                    duration: 0.2,
                    type: "tween",
                    ease: "easeOut"
                  }}
                >
                  <div className="inline-block text-[#08f9ff]">
                    {feature.icon}
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-white font-semibold text-sm mb-1 group-hover:text-[#08f9ff] transition-colors duration-300">
                    {feature.label}
                  </div>
                  <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                     {feature.desc}
                   </div>
                </div>
                
                {/* 3D Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#08f9ff]/50 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, transparent, rgba(8,249,255,0.1), transparent)',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            ))}
            </motion.div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal direction="up" delay={0.3}>
            <motion.div
              className="flex justify-center space-x-8 mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
            {[
              { number: '1000+', label: 'Developer Tools' },
              { number: '100k+', label: 'Resources' },
              { number: '24/7', label: 'Always Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#08f9ff] mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
            </motion.div>
          </ScrollReveal>



          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Primary CTA */}
              <motion.button 
                className="relative group border-2 border-[#08f9ff] bg-transparent text-[#08f9ff] font-bold px-6 py-3 rounded-xl text-base uppercase overflow-hidden transition-colors duration-500 ease-out hover:text-black cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                onClick={() => {
                  const toolsSection = document.getElementById('tools');
                  if (toolsSection) {
                    const headerHeight = 80;
                    const elementTop = toolsSection.getBoundingClientRect().top;
                    const currentScroll = window.pageYOffset;
                    const targetPosition = currentScroll + elementTop - headerHeight;
                    
                    window.scrollTo({
                      top: Math.max(0, targetPosition),
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {/* Bottom-to-top fill animation */}
                <div className="absolute bottom-0 left-0 w-full h-0 bg-[#08f9ff] rounded-xl transition-all duration-500 ease-out group-hover:h-full" />
                
                <span className="relative z-10 flex items-center gap-2">
                  Start Building
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: 3, 
                      ease: "easeInOut" 
                    }}
                  >
                    →
                  </motion.span>
                </span>
                
                {/* Animated Stars */}
                <motion.div 
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 text-black"
                  variants={starVariants}
                  animate="animate"
                >
                  <svg viewBox="0 0 784.11 815.53" className="w-full h-full fill-current">
                    <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 text-black"
                  variants={starVariants}
                  animate="animate"
                  style={{ animationDelay: '0.5s' }}
                >
                  <svg viewBox="0 0 784.11 815.53" className="w-full h-full fill-current">
                    <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/4 right-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 text-black"
                  variants={starVariants}
                  animate="animate"
                  style={{ animationDelay: '2.5s' }}
                >
                  <svg viewBox="0 0 784.11 815.53" className="w-full h-full fill-current">
                    <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                  </svg>
                </motion.div>
              </motion.button>

            {/* Secondary CTA */}
            <motion.a
              href="#tools"
              className="inline-flex items-center px-6 py-3 text-white border border-gray-600 rounded-xl hover:border-white transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                const toolsSection = document.getElementById('tools');
                if (toolsSection) {
                  const headerHeight = 80;
                  const elementTop = toolsSection.getBoundingClientRect().top;
                  const currentScroll = window.pageYOffset;
                  const targetPosition = currentScroll + elementTop - headerHeight;
                  
                  window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <span className="mr-2">Browse Tools</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: 2, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#08f9ff] rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: 1,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Mouse Follower Effect */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-[#08f9ff]/10 to-[#0066cc]/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: 1,
            opacity: 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;