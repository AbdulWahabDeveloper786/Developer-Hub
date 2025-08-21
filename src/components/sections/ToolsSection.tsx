'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const ToolsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const toolCategories = [
    { id: 'all', name: 'All Tools', icon: '🛠️' },
    { id: 'ai', name: 'AI & Automation', icon: '🤖' },
    { id: 'design', name: 'Design & UI', icon: '🎨' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' }
  ];

  const tools = [
    {
      name: 'DeepSeek AI',
      url: 'https://chat.deepseek.com/',
      description: 'Advanced AI assistant for coding and problem-solving',
      category: 'ai',
      rating: 4.9,
      users: '2M+'
    },
    {
      name: 'CodePen',
      url: 'https://codepen.io/trending',
      description: 'Online code editor and playground for frontend development',
      category: 'development',
      rating: 4.8,
      users: '5M+'
    },
    {
      name: 'Tailwind Gradient Generator',
      url: 'https://gradienty.codes/',
      description: 'Beautiful gradient generator for Tailwind CSS',
      category: 'design',
      rating: 4.7,
      users: '500K+'
    },
    {
      name: 'CSS Generator',
      url: 'https://www.cssportal.com/css-functions/counter.php',
      description: 'Comprehensive CSS tools and generators',
      category: 'development',
      rating: 4.6,
      users: '1M+'
    },
    {
      name: 'GitHub Copilot',
      url: 'https://github.com/features/copilot',
      description: 'AI-powered code completion and suggestions',
      category: 'ai',
      rating: 4.8,
      users: '10M+'
    },
    {
      name: 'Figma',
      url: 'https://www.figma.com/',
      description: 'Collaborative interface design tool',
      category: 'design',
      rating: 4.9,
      users: '20M+'
    },
    {
      name: 'Vercel',
      url: 'https://vercel.com/',
      description: 'Platform for frontend frameworks and static sites',
      category: 'productivity',
      rating: 4.8,
      users: '3M+'
    },
    {
      name: 'Notion',
      url: 'https://www.notion.so/',
      description: 'All-in-one workspace for notes, docs, and project management',
      category: 'productivity',
      rating: 4.7,
      users: '30M+'
    }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);



  return (
    <motion.section 
      id="tools" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900"
      initial={{ x: -100, opacity: 0 }}
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Essential Web <span className="text-[#08f9ff]">Tools</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-8">
            Discover the powerful tools and platforms that streamline modern web development workflow
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {toolCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
          </div>
        </motion.div>

        {/* Tools Grid */}
        <ScrollReveal direction="up" delay={0.2}>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            layout
          >
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.button
                  className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden transition-all duration-300 hover:border-[#08f9ff]/50 hover:shadow-lg hover:shadow-[#08f9ff]/25 hover:from-[#08f9ff]/10 hover:to-[#0066cc]/10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Arrow Icons */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#08f9ff]"
                      fill="currentColor"
                    >
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#08f9ff] transition-colors leading-tight">
                      {tool.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-3">
                      {tool.description}
                    </p>
                    
                    {/* Rating and Users */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span>{tool.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#08f9ff] mr-1">👥</span>
                        <span>{tool.users}</span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Circle */}
                  <motion.div
                    className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-[#08f9ff] rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#08f9ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Bottom Arrow */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-[#08f9ff]"
                      fill="currentColor"
                    >
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default ToolsSection;