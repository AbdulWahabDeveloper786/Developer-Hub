'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
      
      // Update active section based on scroll position
      const sections = ['home', 'resources', 'tools', 'libraries-frameworks', 'about_me'];
      
      // Find the section that's currently in view
      let currentSection = null;
      const headerHeight = 80;
      const offset = 100; // Increased offset for better detection
      
      // Check each section to find which one is currently visible
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // A section is considered active if:
          // 1. Its top is above the header + offset
          // 2. Its bottom is below the header + offset
          if (sectionTop <= headerHeight + offset && sectionBottom >= headerHeight + offset) {
            currentSection = section;
            break;
          }
        }
      }
      
      // Fallback: if no section is in the exact position, find the closest one
      if (!currentSection) {
        let closestSection = sections[0];
        let closestDistance = Infinity;
        
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Calculate distance from the top of viewport + header height
            const distance = Math.abs(rect.top - headerHeight);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          }
        });
        
        currentSection = closestSection;
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial call to set the active section on page load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only prevent default for internal navigation links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close menu immediately
        closeMenu();
        
        // Use a simple, reliable scroll approach
        setTimeout(() => {
          const headerHeight = 80;
          const elementTop = targetElement.getBoundingClientRect().top;
          const currentScroll = window.pageYOffset;
          const targetPosition = currentScroll + elementTop - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }, 100); // Small delay to ensure menu closes first
      } else {
        // If target not found, close menu immediately
        closeMenu();
      }
    }
    // For external links, let the default behavior happen
  };

  const navLinks = [
      { href: '#home', label: 'Home', id: 'home' },
      { href: '#resources', label: 'Resources', id: 'resources' },
      { href: '#tools', label: 'Tools', id: 'tools' },
      { href: '#libraries-frameworks', label: 'Libraries & Frameworks', id: 'libraries-frameworks' },
      { href: '#about_me', label: 'About', id: 'about_me' },
  ];

  return (
    <motion.header
      ref={menuRef}
      className={`fixed top-0 w-full h-20 z-[10001] transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#08f9ff]/20' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/logos/Logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-2 text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-[#08f9ff]'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#08f9ff] rounded-full"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`lg:hidden w-14 h-16 flex items-center justify-center text-white rounded-xl transition-all duration-300 relative z-[10002] p-0 ${
              isMenuOpen ? 'bg-gradient-to-br from-[#08f9ff]/30 to-[#0066cc]/30 border border-[#08f9ff]/50 shadow-lg shadow-[#08f9ff]/20' : 'hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:shadow-md'
            }`}
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col justify-center items-center w-6 h-8">
              <motion.span
                className="w-6 h-0.5 bg-white block absolute rounded-full"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : -4,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block absolute rounded-full"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  y: 0,
                  scaleX: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block absolute rounded-full"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 4,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navigation - Moved outside nav container for full width */}
      <motion.div
        className="lg:hidden overflow-hidden fixed left-0 right-0 top-20 z-[10003] bg-gradient-to-b from-black/98 via-black/95 to-black/90 backdrop-blur-xl border-t border-[#08f9ff]/20"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="">
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={`relative flex items-center py-4 text-lg font-medium transition-all duration-300 group ${
                  activeSection === link.id
                    ? 'text-[#08f9ff] bg-gradient-to-r from-[#08f9ff]/20 via-[#08f9ff]/10 to-transparent border-l-4 border-[#08f9ff] shadow-lg shadow-[#08f9ff]/10'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:via-white/5 hover:to-transparent hover:border-l-4 hover:border-white/30'
                } border-l-4 border-transparent px-4`}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: -30, rotateY: -15 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : -30,
                  rotateY: isMenuOpen ? 0 : -15
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: isMenuOpen ? index * 0.1 + 0.1 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileTap={{ scale: 0.98, x: 5 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.id && (
                  <motion.div
                    className="absolute right-4 w-2 h-2 bg-[#08f9ff] rounded-full shadow-lg shadow-[#08f9ff]/50"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#08f9ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          className="lg:hidden fixed inset-0 bg-black/50 z-[10000] w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeMenu}
        />
      )}
    </motion.header>
  );
};

export default Header;