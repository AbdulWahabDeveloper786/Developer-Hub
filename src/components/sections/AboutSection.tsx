'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '👨‍💻' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ];

  const cards = [
    {
      icon: 'fas fa-code',
      title: 'Technical Skills',
      content: [
        'Frontend: React, Next.js, TypeScript, Tailwind CSS',
        'Backend: Node.js, Express, MongoDB, PostgreSQL',
        'Animation: Framer Motion, Three.js, GSAP, Lottie',
        'Tools: Git, Docker, Vercel, AWS, Figma'
      ]
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Professional Experience',
      content: [
        '3+ years in web development',
        'Senior Full Stack Developer',
        'UI/UX Designer & Consultant',
        'Technical Lead & Mentor'
      ]
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education & Certifications',
      content: [
        'Bachelor of Computer Science',
        'MERN Stack Developer Certification',
        'AWS Cloud Practitioner',
        'Google UX Design Certificate'
      ]
    },
    {
      icon: 'fas fa-trophy',
      title: 'Achievements',
      content: [
        '50+ successful projects delivered',
        'Top 1% developer on GitHub',
        'Speaker at tech conferences',
        'Open source contributor'
      ]
    }
  ];

  const personalInfo = {
    overview: {
      title: 'Passionate Full Stack Developer',
      description: 'I\'m a dedicated web developer with a passion for creating exceptional digital experiences. With expertise in modern web technologies and a keen eye for design, I transform ideas into powerful, user-friendly applications.',
      highlights: [
        '🚀 Specialized in React & Next.js ecosystem',
        '🎨 Strong focus on UI/UX and animations',
        '⚡ Performance optimization enthusiast',
        '🌍 Remote collaboration expert'
      ]
    },
    skills: {
      frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
      tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma']
    },
    experience: [
      {
        title: 'Senior Full Stack Developer',
        company: 'Tech Solutions Inc.',
        period: '2022 - Present',
        description: 'Leading development of enterprise web applications'
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Agency',
        period: '2021 - 2022',
        description: 'Created responsive websites and web applications'
      }
    ],
    achievements: [
      { title: 'GitHub Stars', value: '2.5K+', icon: '⭐' },
      { title: 'Projects Completed', value: '50+', icon: '🚀' },
      { title: 'Client Satisfaction', value: '98%', icon: '😊' },
      { title: 'Code Reviews', value: '500+', icon: '👨‍💻' }
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/AbdulWahabDeveloper786', label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/abdul-wahab-dev-320078380', label: 'LinkedIn' },
    { icon: 'fab fa-youtube', url: 'http://www.youtube.com/@AbdulWahabDev-786', label: 'YouTube' },
    { icon: 'fab fa-dribbble', url: 'https://dribbble.com/', label: 'Dribbble Inspiration' },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        type: 'spring' as const,
        stiffness: 200
      }
    }
  };

  return (
    <footer>
      <motion.section 
        id="about_me" 
        className="min-h-screen py-12 sm:py-16 lg:py-20 bg-black text-white"
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
            <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08f9ff] mb-6 sm:mb-8">
              About Me
            </h4>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get to know more about my journey, skills, and passion for creating amazing web experiences
            </p>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#08f9ff] text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </motion.button>
              ))}
            </div>
            
            {/* Profile Image */}
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-8 sm:mb-10 md:mb-12 rounded-full overflow-hidden border-4 border-[#08f9ff] shadow-2xl shadow-[#08f9ff]/30"
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(8, 249, 255, 0.5)'
              }}
            >
              <Image
                src="/images/profile/profile.jpg"
                alt="About Me"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              />
            </motion.div>
          </motion.div>

          {/* Dynamic Content Based on Active Tab */}
          <ScrollReveal direction="left" delay={0.2}>
            <motion.div
              className="mb-12 sm:mb-16"
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            {activeTab === 'overview' && (
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{personalInfo.overview.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{personalInfo.overview.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {personalInfo.overview.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-gray-300">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {personalInfo.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl text-center border border-gray-700 hover:border-[#08f9ff]/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="text-2xl font-bold text-[#08f9ff] mb-1">{achievement.value}</div>
                    <div className="text-sm text-gray-400">{achievement.title}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Cards Container */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="group"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-[#08f9ff] transition-all duration-300 hover:shadow-2xl hover:shadow-[#08f9ff]/20 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 2,
                    rotateX: 2
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#08f9ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#08f9ff] rounded-full flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`${card.icon} text-lg sm:text-xl lg:text-2xl text-black`}></i>
                  </motion.div>
                  
                  {/* Title */}
                  <h2 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-bold text-center mb-3 sm:mb-4 group-hover:text-[#08f9ff] transition-colors">
                    {card.title}
                  </h2>
                  
                  {/* Content */}
                  <div className="relative z-10 space-y-2">
                    {card.content.map((line, lineIndex) => (
                      <motion.p
                        key={lineIndex}
                        className="text-gray-300 text-center group-hover:text-white transition-colors text-sm sm:text-base"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: lineIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  
                  {/* Removed floating particles for better performance */}
                </motion.div>
              </motion.div>
            ))}
            </motion.div>
          </ScrollReveal>

          {/* Social Icons */}
          <ScrollReveal direction="scale" delay={0.5}>
            <motion.div
              className="flex justify-center space-x-3 sm:space-x-4 lg:space-x-6"
              variants={containerVariants}
              initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                variants={socialVariants}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-full flex items-center justify-center hover:border-[#08f9ff] hover:shadow-lg hover:shadow-[#08f9ff]/30 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      backgroundColor: '#08f9ff'
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className={`${social.icon} text-base sm:text-lg lg:text-xl text-white group-hover:text-black transition-colors`}></i>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            </motion.div>
          </ScrollReveal>
          

        </div>
      </motion.section>
    </footer>
  );
};

export default AboutSection;