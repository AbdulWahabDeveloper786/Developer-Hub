'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const ResourceDatabaseSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'mobile', name: 'Mobile', icon: '📱' },
    { id: 'devops', name: 'DevOps', icon: '🚀' },
    { id: 'design', name: 'Design', icon: '✨' },
    { id: 'learning', name: 'Learning', icon: '🎓' }
  ];

  const resources = [
    // Frontend Resources
    {
      id: 'react-docs',
      name: 'React Documentation',
      category: 'frontend',
      type: 'Documentation',
      description: 'Official React documentation with guides, API reference, and tutorials',
      url: 'https://react.dev',
      tags: ['react', 'javascript', 'ui'],
      rating: 5,
      free: true
    },
    {
      id: 'mdn-web-docs',
      name: 'MDN Web Docs',
      category: 'frontend',
      type: 'Documentation',
      description: 'Comprehensive web development documentation by Mozilla',
      url: 'https://developer.mozilla.org',
      tags: ['html', 'css', 'javascript', 'web-apis'],
      rating: 5,
      free: true
    },
    {
      id: 'tailwind-css',
      name: 'Tailwind CSS',
      category: 'frontend',
      type: 'Framework',
      description: 'Utility-first CSS framework for rapid UI development',
      url: 'https://tailwindcss.com',
      tags: ['css', 'styling', 'utility'],
      rating: 5,
      free: true
    },
    {
      id: 'framer-motion',
      name: 'Framer Motion',
      category: 'frontend',
      type: 'Library',
      description: 'Production-ready motion library for React',
      url: 'https://www.framer.com/motion',
      tags: ['react', 'animation', 'motion'],
      rating: 5,
      free: true
    },
    
    // Backend Resources
    {
      id: 'nodejs-docs',
      name: 'Node.js Documentation',
      category: 'backend',
      type: 'Documentation',
      description: 'Official Node.js documentation and guides',
      url: 'https://nodejs.org/docs',
      tags: ['nodejs', 'javascript', 'server'],
      rating: 5,
      free: true
    },
    {
      id: 'express-js',
      name: 'Express.js',
      category: 'backend',
      type: 'Framework',
      description: 'Fast, unopinionated web framework for Node.js',
      url: 'https://expressjs.com',
      tags: ['nodejs', 'framework', 'api'],
      rating: 5,
      free: true
    },
    {
      id: 'mongodb-docs',
      name: 'MongoDB Documentation',
      category: 'backend',
      type: 'Database',
      description: 'NoSQL database documentation and tutorials',
      url: 'https://docs.mongodb.com',
      tags: ['database', 'nosql', 'mongodb'],
      rating: 4,
      free: true
    },
    {
      id: 'postgresql-docs',
      name: 'PostgreSQL Documentation',
      category: 'backend',
      type: 'Database',
      description: 'Advanced open source relational database',
      url: 'https://www.postgresql.org/docs',
      tags: ['database', 'sql', 'postgresql'],
      rating: 5,
      free: true
    },

    // Mobile Resources
    {
      id: 'react-native',
      name: 'React Native',
      category: 'mobile',
      type: 'Framework',
      description: 'Build mobile apps using React',
      url: 'https://reactnative.dev',
      tags: ['react', 'mobile', 'ios', 'android'],
      rating: 4,
      free: true
    },
    {
      id: 'flutter-docs',
      name: 'Flutter Documentation',
      category: 'mobile',
      type: 'Framework',
      description: 'Google\'s UI toolkit for building natively compiled applications',
      url: 'https://flutter.dev/docs',
      tags: ['flutter', 'dart', 'mobile', 'google'],
      rating: 5,
      free: true
    },

    // DevOps Resources
    {
      id: 'docker-docs',
      name: 'Docker Documentation',
      category: 'devops',
      type: 'Platform',
      description: 'Containerization platform documentation',
      url: 'https://docs.docker.com',
      tags: ['docker', 'containers', 'devops'],
      rating: 5,
      free: true
    },
    {
      id: 'kubernetes-docs',
      name: 'Kubernetes Documentation',
      category: 'devops',
      type: 'Platform',
      description: 'Container orchestration platform',
      url: 'https://kubernetes.io/docs',
      tags: ['kubernetes', 'orchestration', 'containers'],
      rating: 4,
      free: true
    },
    {
      id: 'aws-docs',
      name: 'AWS Documentation',
      category: 'devops',
      type: 'Cloud',
      description: 'Amazon Web Services documentation and guides',
      url: 'https://docs.aws.amazon.com',
      tags: ['aws', 'cloud', 'infrastructure'],
      rating: 4,
      free: true
    },

    // Design Resources
    {
      id: 'figma',
      name: 'Figma',
      category: 'design',
      type: 'Tool',
      description: 'Collaborative interface design tool',
      url: 'https://www.figma.com',
      tags: ['design', 'ui', 'collaboration'],
      rating: 5,
      free: false
    },
    {
      id: 'dribbble',
      name: 'Dribbble',
      category: 'design',
      type: 'Inspiration',
      description: 'Design inspiration and portfolio platform',
      url: 'https://dribbble.com',
      tags: ['design', 'inspiration', 'portfolio'],
      rating: 4,
      free: false
    },
    {
      id: 'unsplash',
      name: 'Unsplash',
      category: 'design',
      type: 'Assets',
      description: 'Free high-quality photos for your projects',
      url: 'https://unsplash.com',
      tags: ['photos', 'free', 'assets'],
      rating: 5,
      free: true
    },

    // Learning Resources
    {
      id: 'freecodecamp',
      name: 'freeCodeCamp',
      category: 'learning',
      type: 'Course',
      description: 'Free coding bootcamp with certifications',
      url: 'https://www.freecodecamp.org',
      tags: ['learning', 'free', 'certification'],
      rating: 5,
      free: true
    },
    {
      id: 'codecademy',
      name: 'Codecademy',
      category: 'learning',
      type: 'Course',
      description: 'Interactive coding lessons and projects',
      url: 'https://www.codecademy.com',
      tags: ['learning', 'interactive', 'projects'],
      rating: 4,
      free: false
    },
    {
      id: 'youtube-dev',
      name: 'YouTube Dev Channels',
      category: 'learning',
      type: 'Video',
      description: 'Curated list of best development YouTube channels',
      url: '#',
      tags: ['youtube', 'video', 'tutorials'],
      rating: 4,
      free: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Documentation': 'bg-blue-500/20 text-blue-300',
      'Framework': 'bg-green-500/20 text-green-300',
      'Library': 'bg-purple-500/20 text-purple-300',
      'Database': 'bg-orange-500/20 text-orange-300',
      'Platform': 'bg-red-500/20 text-red-300',
      'Cloud': 'bg-cyan-500/20 text-cyan-300',
      'Tool': 'bg-pink-500/20 text-pink-300',
      'Inspiration': 'bg-yellow-500/20 text-yellow-300',
      'Assets': 'bg-indigo-500/20 text-indigo-300',
      'Course': 'bg-emerald-500/20 text-emerald-300',
      'Video': 'bg-rose-500/20 text-rose-300'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-300';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
        ★
      </span>
    ));
  };

  return (
    <motion.section 
      id="resources" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 1, 
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Developer </span>
              <span className="text-[#08f9ff] glow-text">Resource Hub</span>
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Curated collection of the best development resources, tutorials, and documentation
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Search functionality is now available in the header */}

        {/* Category Filter */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#08f9ff] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Resources Grid */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#08f9ff]/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#08f9ff] transition-colors">
                        {resource.name}
                      </h3>
                      {resource.free && (
                        <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                          FREE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <div className="flex items-center">
                        {renderStars(resource.rating)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{resource.tags.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#08f9ff] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#06d4e0] transition-colors text-sm"
                  >
                    Visit Resource
                  </a>
                  <button className="text-gray-400 hover:text-[#08f9ff] transition-colors">
                    🔖
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No resources found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter</p>
          </div>
        )}

        {/* Stats */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#08f9ff] mb-2">{resources.length}+</div>
                <div className="text-gray-400">Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#08f9ff] mb-2">{categories.length - 1}</div>
                <div className="text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#08f9ff] mb-2">{resources.filter(r => r.free).length}</div>
                <div className="text-gray-400">Free Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#08f9ff] mb-2">24/7</div>
                <div className="text-gray-400">Available</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default ResourceDatabaseSection;