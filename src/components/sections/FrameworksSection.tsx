'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import useMobile from '@/hooks/useMobile';

const FrameworksSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);
  const isMobile = useMobile();

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'framework', name: 'Frameworks', icon: '⚛️' },
    { id: 'ui', name: 'UI Libraries', icon: '🎨' },
    { id: 'state', name: 'State Management', icon: '🔄' },
    { id: 'routing', name: 'Routing', icon: '🛣️' },
    { id: 'testing', name: 'Testing', icon: '🧪' },
    { id: 'build', name: 'Build Tools', icon: '🔧' },
    { id: 'animation', name: 'Animation', icon: '✨' }
  ];

  const frameworks = [
    {
      name: 'Next.js',
      url: 'https://nextjs.org',
      category: 'framework',
      description: 'The React Framework for Production. Full-stack React framework with SSR, SSG, and API routes.',
      popularity: 95,
      version: '14.0',
      features: ['SSR/SSG', 'API Routes', 'File-based Routing', 'Image Optimization']
    },
    {
      name: 'Gatsby',
      url: 'https://gatsbyjs.com',
      category: 'framework',
      description: 'Build blazing fast, modern apps and websites with React. Static site generator with GraphQL.',
      popularity: 78,
      version: '5.0',
      features: ['Static Generation', 'GraphQL', 'Plugin Ecosystem', 'Performance']
    },
    {
      name: 'Remix',
      url: 'https://remix.run',
      category: 'framework',
      description: 'Full stack web framework focused on web standards and modern UX.',
      popularity: 72,
      version: '2.0',
      features: ['Web Standards', 'Nested Routing', 'Data Loading', 'Error Boundaries']
    },
    {
      name: 'Material-UI',
      url: 'https://mui.com',
      category: 'ui',
      description: 'React components implementing Google\'s Material Design. Most popular React UI framework.',
      popularity: 92,
      version: '5.14',
      features: ['Material Design', 'Theming', 'Accessibility', 'TypeScript']
    },
    {
      name: 'Ant Design',
      url: 'https://ant.design',
      category: 'ui',
      description: 'Enterprise-class UI design language and React components.',
      popularity: 88,
      version: '5.0',
      features: ['Enterprise UI', 'Rich Components', 'Design Language', 'Internationalization']
    },
    {
      name: 'Chakra UI',
      url: 'https://chakra-ui.com',
      category: 'ui',
      description: 'Simple, modular and accessible component library for React.',
      popularity: 85,
      version: '2.8',
      features: ['Accessibility', 'Dark Mode', 'Responsive', 'Composable']
    },
    {
      name: 'Redux Toolkit',
      url: 'https://redux-toolkit.js.org',
      category: 'state',
      description: 'The official, opinionated, batteries-included toolset for efficient Redux development.',
      popularity: 90,
      version: '1.9',
      features: ['Simplified Redux', 'Immutable Updates', 'DevTools', 'RTK Query']
    },
    {
      name: 'Zustand',
      url: 'https://zustand-demo.pmnd.rs',
      category: 'state',
      description: 'Small, fast and scalable bearbones state-management solution.',
      popularity: 82,
      version: '4.4',
      features: ['Lightweight', 'TypeScript', 'No Boilerplate', 'Middleware']
    },
    {
      name: 'React Router',
      url: 'https://reactrouter.com',
      category: 'routing',
      description: 'Declarative routing for React. The standard routing library for React applications.',
      popularity: 94,
      version: '6.16',
      features: ['Declarative', 'Nested Routes', 'Code Splitting', 'Data Loading']
    },
    {
      name: 'React Testing Library',
      url: 'https://testing-library.com/docs/react-testing-library/intro',
      category: 'testing',
      description: 'Simple and complete testing utilities that encourage good testing practices.',
      popularity: 89,
      version: '13.4',
      features: ['User-centric', 'Accessibility', 'Best Practices', 'Jest Integration']
    },
    {
      name: 'Vite',
      url: 'https://vitejs.dev',
      category: 'build',
      description: 'Next generation frontend tooling. Fast build tool and dev server.',
      popularity: 91,
      version: '4.4',
      features: ['Fast HMR', 'ES Modules', 'Plugin System', 'TypeScript']
    },
    {
      name: 'Framer Motion',
      url: 'https://framer.com/motion',
      category: 'animation',
      description: 'Production-ready motion library for React. Declarative animations and gestures.',
      popularity: 87,
      version: '10.16',
      features: ['Declarative', 'Gestures', 'Layout Animations', 'SVG Support']
    }
  ];

  const filteredFrameworks = activeCategory === 'all' 
    ? frameworks 
    : frameworks.filter(framework => framework.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.02 : 0.05, // Faster stagger for mobile
        type: 'tween'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 5 : 10 }, // Reduced movement on mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.3, // Faster on mobile
        type: 'tween',
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.section 
      id="frameworks" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900"
      initial={isMobile ? {} : { x: -100, opacity: 0 }}
      whileInView={isMobile ? {} : { x: 0, opacity: 1 }}
      transition={isMobile ? {} : { 
        duration: 1, 
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={isMobile ? {} : { opacity: 0, y: 30 }}
          whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08f9ff] mb-6 sm:mb-8">
            React Frameworks & Libraries
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the most powerful React frameworks, UI libraries, and tools that will supercharge your development workflow
          </p>

          {/* Category Filter */}
          <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#08f9ff] text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Frameworks Grid */}
        <ScrollReveal direction="rotate" delay={0.4}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredFrameworks.map((framework) => (
              <motion.div
                key={framework.name}
                variants={itemVariants}
                className="group"
                onMouseEnter={() => setHoveredFramework(framework.name)}
                onMouseLeave={() => setHoveredFramework(null)}
              >
                <Link href={framework.url} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 h-full border border-gray-700 hover:border-[#08f9ff]/50 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#08f9ff]/20 overflow-hidden"
                    whileHover={isMobile ? {} : { y: -3 }}
                    transition={isMobile ? {} : { duration: 0.2, type: 'tween' }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#08f9ff] transition-colors leading-tight">
                            {framework.name}
                          </h3>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-xs text-gray-300 bg-black/20 px-2 py-1 rounded">
                              v{framework.version}
                            </span>
                            <span className="text-xs text-yellow-400 flex items-center">
                              ⭐ {framework.popularity}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Popularity Circle */}
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#374151"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#08f9ff"
                              strokeWidth="2"
                              strokeDasharray={`${framework.popularity}, 100`}
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-[#08f9ff]">
                              {framework.popularity}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-200 group-hover:text-white transition-colors mb-4 flex-grow">
                        {framework.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Key Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {framework.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded group-hover:bg-[#08f9ff]/20 group-hover:text-[#08f9ff] transition-colors"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 capitalize">
                          {framework.category}
                        </span>
                        <motion.div
                          className="w-6 h-6 text-[#08f9ff] opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={isMobile ? {} : (hoveredFramework === framework.name ? { x: 5 } : { x: 0 })}
                          transition={isMobile ? {} : { duration: 0.3 }}
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#08f9ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>

        {/* Stats Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '25+', label: 'Frameworks', icon: '⚛️' },
              { number: '1M+', label: 'Downloads/Day', icon: '📦' },
              { number: '500K+', label: 'GitHub Stars', icon: '⭐' },
              { number: '99%', label: 'Satisfaction', icon: '💯' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#08f9ff] mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FrameworksSection;