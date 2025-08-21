'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const DesignSection = () => {
  const designs = [
    {
      url: 'https://cornrevolution.resn.global/',
      image: '/images/portfolio/project-4.png',
      title: 'Corn Revolution'
    },
    {
      url: 'https://www.igloo.inc/',
      image: '/images/portfolio/project-1.png',
      title: 'Igloo Inc'
    },
    {
      url: 'https://persepolis.getty.edu/',
      image: '/images/portfolio/project-3.png',
      title: 'Persepolis Getty'
    },
    {
      url: 'https://kprverse.com/',
      image: '/images/portfolio/project-2.png',
      title: 'KPR Verse'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="design" className="min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-gray-900 to-black text-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08f9ff] mb-4">
            Top Design
          </h4>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Explore creative designs and visual inspirations
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {designs.map((design, index) => (
            <motion.div
              key={design.title}
              variants={itemVariants}
              className="group"
            >
              <Link
                href={design.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 hover:border-[#08f9ff] transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#08f9ff]/20"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 2,
                    rotateX: 2
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ perspective: 1000 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={design.image}
                      alt={design.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Hover Content */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center px-4">
                        <h5 className="text-white font-bold text-base sm:text-lg mb-2">
                          {design.title}
                        </h5>
                        <div className="flex items-center justify-center space-x-2 text-[#08f9ff]">
                          <span className="text-xs sm:text-sm">View Design</span>
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="currentColor"
                          >
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg sm:rounded-xl bg-[#08f9ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-[#08f9ff]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DesignSection;