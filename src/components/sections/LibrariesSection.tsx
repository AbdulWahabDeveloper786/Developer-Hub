'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const LibrariesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredLibrary, setHoveredLibrary] = useState(null);

  const categories = [
    { id: 'all', name: 'All Libraries', icon: '📚' },
    { id: 'css', name: 'CSS & Styling', icon: '🎨' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡' },

    { id: 'animation', name: 'Animation', icon: '🎭' },
    { id: 'ui', name: 'UI Components', icon: '🧩' }
  ];

  const libraries = [
    { 
      name: 'Tailwind CSS', 
      url: 'https://tailwindcss.com/', 
      category: 'css',
      description: 'Utility-first CSS framework',
      popularity: 95,
      version: 'v3.4'
    },
    { 
      name: 'Bootstrap 5', 
      url: 'https://getbootstrap.com/', 
      category: 'css',
      description: 'Popular CSS framework',
      popularity: 88,
      version: 'v5.3'
    },
    { 
      name: 'Font Awesome', 
      url: 'https://fontawesome.com/', 
      category: 'ui',
      description: 'Icon library and toolkit',
      popularity: 92,
      version: 'v6.5'
    },
    { 
      name: 'Google Fonts', 
      url: 'https://fonts.google.com/', 
      category: 'css',
      description: 'Web font library',
      popularity: 98,
      version: 'Latest'
    },
    { 
      name: 'GSAP', 
      url: 'https://gsap.com/', 
      category: 'animation',
      description: 'Professional animation library',
      popularity: 89,
      version: 'v3.12'
    },
    { 
      name: 'Three.js', 
      url: 'https://threejs.org/', 
      category: 'javascript',
      description: '3D graphics library',
      popularity: 85,
      version: 'r160'
    },
    { 
      name: 'Coolors', 
      url: 'https://coolors.co/', 
      category: 'css',
      description: 'Color palette generator',
      popularity: 78,
      version: 'Web'
    },
    { 
      name: 'UI Verse', 
      url: 'https://uiverse.io/', 
      category: 'ui',
      description: 'Open-source UI elements',
      popularity: 82,
      version: 'Latest'
    },
    { 
      name: 'Lottie', 
      url: 'https://lottiefiles.com/', 
      category: 'animation',
      description: 'Animation library',
      popularity: 80,
      version: 'Latest'
    },
    { 
      name: 'Chart.js', 
      url: 'https://www.chartjs.org/', 
      category: 'javascript',
      description: 'Chart and graph library',
      popularity: 84,
      version: 'v4.4'
    },
    { 
      name: 'D3.js', 
      url: 'https://d3js.org/', 
      category: 'javascript',
      description: 'Data visualization library',
      popularity: 88,
      version: 'v7.8'
    },
    { 
      name: 'Animate.css', 
      url: 'https://animate.style/', 
      category: 'animation',
      description: 'CSS animation library',
      popularity: 85,
      version: 'v4.1'
    },
    { 
      name: 'AOS', 
      url: 'https://michalsnik.github.io/aos/', 
      category: 'animation',
      description: 'Animate On Scroll library',
      popularity: 82,
      version: 'v2.3'
    },
    { 
      name: 'Swiper', 
      url: 'https://swiperjs.com/', 
      category: 'ui',
      description: 'Modern touch slider',
      popularity: 87,
      version: 'v11.0'
    },
    { 
      name: 'Particles.js', 
      url: 'https://vincentgarreau.com/particles.js/', 
      category: 'animation',
      description: 'Lightweight particle animation',
      popularity: 79,
      version: 'v2.0'
    },
    { 
      name: 'Typed.js', 
      url: 'https://mattboldt.com/demos/typed-js/', 
      category: 'animation',
      description: 'Typing animation library',
      popularity: 76,
      version: 'v2.1'
    }
  ];

  const filteredLibraries = activeCategory === 'all' 
    ? libraries 
    : libraries.filter(lib => lib.category === activeCategory);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      id="libraries" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 1, 
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08f9ff] mb-4">
            Essential Web Libraries
          </h4>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
            Powerful general-purpose libraries for styling, animation, and enhanced user experiences
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#08f9ff] text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Libraries Grid */}
        <ScrollReveal direction="scale" delay={0.3}>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            layout
          >
          {filteredLibraries.map((library, index) => (
            <motion.div
              key={library.name}
              variants={itemVariants}
              className="group"
              onHoverStart={() => setHoveredLibrary(library.name)}
              onHoverEnd={() => setHoveredLibrary(null)}
            >
              <Link
                href={library.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.div
                  className="relative h-full p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl transition-all duration-300 hover:border-[#08f9ff]/50 hover:shadow-lg hover:shadow-[#08f9ff]/25 overflow-hidden group backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#08f9ff]/10 to-[#08f9ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#08f9ff] transition-colors leading-tight">
                        {library.name}
                      </h3>
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                        {library.version}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mb-4 flex-grow">
                      {library.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {/* Popularity Bar */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Popular</span>
                        <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#08f9ff] to-blue-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${library.popularity}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        <span className="text-xs text-[#08f9ff]">{library.popularity}%</span>
                      </div>
                      
                      {/* Arrow Icon */}
                      <motion.div
                        className="w-6 h-6 text-[#08f9ff] opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 2 }}
                      >
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default LibrariesSection;