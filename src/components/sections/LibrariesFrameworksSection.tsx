'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import useMobile from '@/hooks/useMobile';

const LibrariesFrameworksSection = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const isMobile = useMobile();

  const categories = {
    frontend: {
      title: 'Frontend Libraries',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      items: [
        {
          name: 'React',
          description: 'A JavaScript library for building user interfaces',
          version: '18.2.0',
          popularity: 95,
          tags: ['UI', 'Components', 'Virtual DOM'],
          logo: '⚛️',
          url: 'https://react.dev'
        },
        {
          name: 'Vue.js',
          description: 'Progressive JavaScript framework for building UIs',
          version: '3.3.0',
          popularity: 88,
          tags: ['Progressive', 'Reactive', 'Templates'],
          logo: '💚',
          url: 'https://vuejs.org'
        },
        {
          name: 'Angular',
          description: 'Platform for building mobile and desktop web applications',
          version: '16.0.0',
          popularity: 82,
          tags: ['TypeScript', 'Enterprise', 'Full-featured'],
          logo: '🅰️',
          url: 'https://angular.io'
        },
        {
          name: 'Svelte',
          description: 'Cybernetically enhanced web apps',
          version: '4.0.0',
          popularity: 78,
          tags: ['Compile-time', 'No runtime', 'Fast'],
          logo: '🔥',
          url: 'https://svelte.dev'
        },
        {
          name: 'Framer Motion',
          description: 'Production-ready motion library for React',
          version: '10.16.0',
          popularity: 85,
          tags: ['Animation', 'Gestures', 'Layout'],
          logo: '🎭',
          url: 'https://framer.com/motion'
        },
        {
          name: 'Three.js',
          description: 'JavaScript 3D library',
          version: '0.155.0',
          popularity: 80,
          tags: ['3D', 'WebGL', 'Graphics'],
          logo: '🎮',
          url: 'https://threejs.org'
        }
      ]
    },
    backend: {
      title: 'Backend Frameworks',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      items: [
        {
          name: 'Express.js',
          description: 'Fast, unopinionated web framework for Node.js',
          version: '4.18.0',
          popularity: 92,
          tags: ['Minimal', 'Flexible', 'Middleware'],
          logo: '🚀',
          url: 'https://expressjs.com'
        },
        {
          name: 'Next.js',
          description: 'The React framework for production',
          version: '13.4.0',
          popularity: 90,
          tags: ['SSR', 'SSG', 'Full-stack'],
          logo: '▲',
          url: 'https://nextjs.org'
        },
        {
          name: 'NestJS',
          description: 'Progressive Node.js framework for scalable server-side applications',
          version: '10.0.0',
          popularity: 85,
          tags: ['TypeScript', 'Decorators', 'Modular'],
          logo: '🐱',
          url: 'https://nestjs.com'
        },
        {
          name: 'Fastify',
          description: 'Fast and low overhead web framework for Node.js',
          version: '4.21.0',
          popularity: 78,
          tags: ['Fast', 'Low overhead', 'Schema-based'],
          logo: '⚡',
          url: 'https://fastify.io'
        },
        {
          name: 'Koa.js',
          description: 'Next generation web framework for Node.js',
          version: '2.14.0',
          popularity: 75,
          tags: ['Async/await', 'Lightweight', 'Expressive'],
          logo: '🥝',
          url: 'https://koajs.com'
        },
        {
          name: 'Hapi.js',
          description: 'Rich framework for building applications and services',
          version: '21.3.0',
          popularity: 70,
          tags: ['Configuration', 'Security', 'Validation'],
          logo: '😊',
          url: 'https://hapi.dev'
        }
      ]
    },
    mobile: {
      title: 'Mobile Frameworks',
      icon: '📱',
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          name: 'React Native',
          description: 'Build mobile apps using React',
          version: '0.72.0',
          popularity: 88,
          tags: ['Cross-platform', 'Native', 'React'],
          logo: '📱',
          url: 'https://reactnative.dev'
        },
        {
          name: 'Flutter',
          description: 'Google\'s UI toolkit for building natively compiled applications',
          version: '3.10.0',
          popularity: 85,
          tags: ['Dart', 'Cross-platform', 'Fast'],
          logo: '🦋',
          url: 'https://flutter.dev'
        },
        {
          name: 'Ionic',
          description: 'Cross-platform mobile app development',
          version: '7.0.0',
          popularity: 75,
          tags: ['Hybrid', 'Web technologies', 'Capacitor'],
          logo: '⚡',
          url: 'https://ionicframework.com'
        },
        {
          name: 'Xamarin',
          description: 'Microsoft\'s mobile app platform',
          version: '5.0.0',
          popularity: 70,
          tags: ['C#', '.NET', 'Native'],
          logo: '🔷',
          url: 'https://dotnet.microsoft.com/apps/xamarin'
        },
        {
          name: 'Cordova',
          description: 'Mobile apps with HTML, CSS & JS',
          version: '12.0.0',
          popularity: 65,
          tags: ['PhoneGap', 'Web-based', 'Plugins'],
          logo: '📦',
          url: 'https://cordova.apache.org'
        },
        {
          name: 'NativeScript',
          description: 'Open source framework for building truly native mobile apps',
          version: '8.5.0',
          popularity: 68,
          tags: ['Native', 'JavaScript', 'Angular/Vue'],
          logo: '🎯',
          url: 'https://nativescript.org'
        }
      ]
    },
    styling: {
      title: 'CSS Frameworks',
      icon: '🎨',
      color: 'from-pink-500 to-rose-500',
      items: [
        {
          name: 'Tailwind CSS',
          description: 'Utility-first CSS framework',
          version: '3.3.0',
          popularity: 92,
          tags: ['Utility-first', 'Responsive', 'Customizable'],
          logo: '🌊',
          url: 'https://tailwindcss.com'
        },
        {
          name: 'Bootstrap',
          description: 'The most popular HTML, CSS, and JS library',
          version: '5.3.0',
          popularity: 85,
          tags: ['Components', 'Grid system', 'Responsive'],
          logo: '🅱️',
          url: 'https://getbootstrap.com'
        },
        {
          name: 'Chakra UI',
          description: 'Simple, modular and accessible component library',
          version: '2.7.0',
          popularity: 80,
          tags: ['React', 'Accessible', 'Themeable'],
          logo: '⚡',
          url: 'https://chakra-ui.com'
        },
        {
          name: 'Material-UI',
          description: 'React components implementing Google\'s Material Design',
          version: '5.14.0',
          popularity: 88,
          tags: ['Material Design', 'React', 'Components'],
          logo: '🎨',
          url: 'https://mui.com'
        },
        {
          name: 'Ant Design',
          description: 'Enterprise-class UI design language and React components',
          version: '5.8.0',
          popularity: 82,
          tags: ['Enterprise', 'React', 'Design system'],
          logo: '🐜',
          url: 'https://ant.design'
        },
        {
          name: 'Bulma',
          description: 'Modern CSS framework based on Flexbox',
          version: '0.9.4',
          popularity: 75,
          tags: ['Flexbox', 'Modern', 'No JS'],
          logo: '💪',
          url: 'https://bulma.io'
        }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      id="libraries-frameworks" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
      initial={isMobile ? {} : { opacity: 0 }}
      whileInView={isMobile ? {} : { opacity: 1 }}
      transition={isMobile ? {} : { duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Particles - Disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
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
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Libraries & </span>
              <span className="text-[#08f9ff] glow-text">Frameworks</span>
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover the most popular and powerful libraries and frameworks for modern development
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {Object.entries(categories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-[#08f9ff] to-[#0066cc] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
                {activeTab === key && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#08f9ff]/20 to-[#0066cc]/20"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Libraries Grid */}
        <ScrollReveal direction="up" delay={0.3}>
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(categories[activeTab as keyof typeof categories]?.items || []).map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-[#08f9ff]/50 transition-all duration-500 group overflow-hidden"
                whileHover={isMobile ? {} : { 
                  scale: 1.01, 
                  y: -2
                }}
                style={{
                  pointerEvents: 'auto'
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Simplified Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categories[activeTab as keyof typeof categories].color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl pointer-events-none`}
                  style={{ zIndex: 0 }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="text-3xl"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.2
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.logo}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#08f9ff] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs text-gray-400">v{item.version}</span>
                    </div>
                  </div>
                  
                  {/* Popularity Indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#08f9ff] to-[#0066cc] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.popularity}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{item.popularity}%</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded group-hover:bg-[#08f9ff]/20 group-hover:text-[#08f9ff] transition-colors"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Learn More Button */}
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-2 text-[#08f9ff] hover:text-white transition-colors text-sm font-medium cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: 'auto', zIndex: 100 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  Learn More
                  <motion.svg 
                    className="w-4 h-4"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </motion.svg>
                </motion.a>

                {/* Removed floating particles for better performance */}
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default LibrariesFrameworksSection;