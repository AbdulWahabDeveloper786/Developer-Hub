'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useMobile from '@/hooks/useMobile';

interface SearchItem {
  title: string;
  category: string;
  section: string;
  description: string;
  url: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const isMobile = useMobile();

  // Handle clicking outside to close menu and search
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      // Close search dropdown when clicking outside (desktop only)
      if (isSearchOpen && !window.matchMedia('(max-width: 768px)').matches) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(target)) {
          setIsSearchOpen(false);
          setSearchQuery('');
          setSearchResults([]);
        }
      }
    };

    if (isMenuOpen || isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen]);

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

  // Search data - this would typically come from a database or API
  const searchData = [
    { title: 'React', category: 'Framework', section: 'libraries-frameworks', description: 'A JavaScript library for building user interfaces', url: 'https://react.dev' },
    { title: 'Next.js', category: 'Framework', section: 'libraries-frameworks', description: 'The React Framework for Production', url: 'https://nextjs.org' },
    { title: 'Tailwind CSS', category: 'CSS Framework', section: 'libraries-frameworks', description: 'Utility-first CSS framework', url: 'https://tailwindcss.com' },
    { title: 'Shadcn/ui', category: 'UI Library', section: 'libraries-frameworks', description: 'Beautifully designed components built with Radix UI and Tailwind CSS', url: 'https://ui.shadcn.com' },
    { title: 'Material UI', category: 'UI Library', section: 'libraries-frameworks', description: 'React components implementing Google\'s Material Design', url: 'https://mui.com' },
    { title: 'Daisy UI', category: 'UI Library', section: 'libraries-frameworks', description: 'The most popular component library for Tailwind CSS', url: 'https://daisyui.com' },
    { title: 'Framer Motion', category: 'Animation Library', section: 'libraries-frameworks', description: 'Production-ready motion library for React', url: 'https://www.framer.com/motion' },
    { title: 'Font Awesome', category: 'Icon Library', section: 'libraries-frameworks', description: 'Icon library and toolkit', url: 'https://fontawesome.com' },
    { title: 'Three.js', category: 'JavaScript Library', section: 'libraries-frameworks', description: '3D graphics library', url: 'https://threejs.org' },
    { title: 'GSAP', category: 'Animation Library', section: 'libraries-frameworks', description: 'Professional animation library', url: 'https://greensock.com/gsap' },
    { title: 'Chart.js', category: 'Data Visualization', section: 'libraries-frameworks', description: 'Chart and graph library', url: 'https://www.chartjs.org' },
    { title: 'Lottie', category: 'Animation Library', section: 'libraries-frameworks', description: 'Render After Effects animations natively on Web', url: 'https://lottiefiles.com' },
    { title: 'AOS', category: 'Animation Library', section: 'libraries-frameworks', description: 'Animate On Scroll Library', url: 'https://michalsnik.github.io/aos' },
    { title: 'Anime.js', category: 'Animation Library', section: 'libraries-frameworks', description: 'Lightweight JavaScript animation library', url: 'https://animejs.com' },
    { title: 'Velocity.js', category: 'Animation Library', section: 'libraries-frameworks', description: 'Accelerated JavaScript animation', url: 'http://velocityjs.org' },
    { title: 'Popmotion', category: 'Animation Library', section: 'libraries-frameworks', description: 'Simple animation libraries for delightful user interfaces', url: 'https://popmotion.io' },
    { title: 'React Spring', category: 'Animation Library', section: 'libraries-frameworks', description: 'Spring-physics based animation library for React', url: 'https://react-spring.dev' },
    { title: 'React Transition Group', category: 'Animation Library', section: 'libraries-frameworks', description: 'Transition components for React', url: 'https://reactcommunity.org/react-transition-group' },
    { title: 'GitHub', category: 'Platform', section: 'tools', description: 'Code hosting platform for version control and collaboration', url: 'https://github.com' },
    { title: 'CodePen', category: 'Tool', section: 'tools', description: 'Online code editor and playground', url: 'https://codepen.io' },
    { title: 'Stack Overflow', category: 'Resource', section: 'resources', description: 'Q&A platform for developers', url: 'https://stackoverflow.com' },
    { title: 'MDN Web Docs', category: 'Resource', section: 'resources', description: 'Web development documentation', url: 'https://developer.mozilla.org' },
    { title: 'Vercel', category: 'Platform', section: 'tools', description: 'Frontend deployment platform', url: 'https://vercel.com' },
    { title: 'Netlify', category: 'Platform', section: 'tools', description: 'Web development platform', url: 'https://netlify.com' },
    { title: 'Figma', category: 'Design Tool', section: 'tools', description: 'Collaborative interface design tool', url: 'https://figma.com' },
    { title: 'Dribbble', category: 'Design Resource', section: 'resources', description: 'Design inspiration and portfolio platform for creative professionals', url: 'https://dribbble.com' },
    { title: 'Pngtree', category: 'Design Resource', section: 'resources', description: 'Millions of PNG images, backgrounds and vectors for free download', url: 'https://pngtree.com' },
    { title: 'Behance', category: 'Design Resource', section: 'resources', description: 'Creative portfolio platform by Adobe', url: 'https://behance.net' },
    { title: 'Unsplash', category: 'Design Resource', section: 'resources', description: 'Free high-resolution photos', url: 'https://unsplash.com' },
    { title: 'Freepik', category: 'Design Resource', section: 'resources', description: 'Free vectors, stock photos and PSD files', url: 'https://freepik.com' },
    { title: 'Canva', category: 'Design Tool', section: 'tools', description: 'Online graphic design platform', url: 'https://canva.com' },
    { title: 'Adobe XD', category: 'Design Tool', section: 'tools', description: 'Vector-based user experience design tool', url: 'https://adobe.com/products/xd.html' },
    { title: 'Sketch', category: 'Design Tool', section: 'tools', description: 'Digital design toolkit for Mac', url: 'https://sketch.com' },
    { title: 'InVision', category: 'Design Tool', section: 'tools', description: 'Digital product design platform', url: 'https://invisionapp.com' },
    { title: 'Zeplin', category: 'Design Tool', section: 'tools', description: 'Design handoff and collaboration tool', url: 'https://zeplin.io' }
  ];

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
  };

  const handleSearchItemClick = (result: SearchItem) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    
    // If the result has a URL, open it in a new tab
    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to section scrolling for items without URLs
      const targetElement = document.getElementById(result.section);
      if (targetElement) {
        const headerHeight = 80;
        const elementTop = targetElement.getBoundingClientRect().top;
        const currentScroll = window.pageYOffset;
        const targetPosition = currentScroll + elementTop - headerHeight;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

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

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative search-container">
            <div className="relative w-full">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search tools, libraries, resources..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full px-4 py-2 pl-10 pr-4 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#08f9ff] focus:bg-gray-800/70 transition-all duration-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </motion.div>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-600/50 rounded-lg shadow-xl z-[10004] max-h-96 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-800/50 cursor-pointer border-b border-gray-700/50 last:border-b-0 transition-colors duration-200"
                      onClick={() => handleSearchItemClick(result)}
                      whileHover={{ backgroundColor: 'rgba(8, 249, 255, 0.1)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium">{result.title}</h4>
                            {result.url && (
                              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{result.description}</p>
                        </div>
                        <span className="text-[#08f9ff] text-xs bg-[#08f9ff]/20 px-2 py-1 rounded ml-3">
                          {result.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Search Button */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-gray-800/50 transition-colors duration-200 relative z-[10009]"
            onClick={toggleSearch}
            whileTap={{ scale: 0.95 }}
            style={{ isolation: 'isolate' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>

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
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
                initial={isMobile ? {} : { opacity: 0, y: -20 }}
                animate={isMobile ? {} : { opacity: 1, y: 0 }}
                transition={isMobile ? {} : { duration: 0.3, delay: index * 0.1 }}
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
  className={`lg:hidden w-12 h-12 flex items-center justify-center text-white rounded-xl transition-all duration-300 relative z-[10010] group ${
    isMenuOpen
      ? 'bg-gradient-to-br from-[#08f9ff]/30 to-[#0066cc]/30 border-2 border-[#08f9ff] shadow-xl shadow-[#08f9ff]/30'
      : 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-600/40 hover:border-[#08f9ff]/60 hover:shadow-lg hover:shadow-[#08f9ff]/20 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90'
  }`}
  onClick={toggleMenu}
  whileTap={{ scale: 0.92 }}
  whileHover={{ scale: 1.05 }}
  style={{ isolation: 'isolate' }}
>
  <div className="relative w-6 h-5 flex flex-col justify-between">
    <motion.span
      className={`w-full h-0.5 block rounded-full transition-colors duration-300 ${
        isMenuOpen ? 'bg-[#08f9ff]' : 'bg-white group-hover:bg-[#08f9ff]'
      }`}
      animate={{
        rotate: isMenuOpen ? 45 : 0,
        y: isMenuOpen ? 8 : 0,
        originX: 0.5,
        originY: 0.5
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
    <motion.span
      className={`w-full h-0.5 block rounded-full transition-colors duration-300 ${
        isMenuOpen ? 'bg-[#08f9ff]' : 'bg-white group-hover:bg-[#08f9ff]'
      }`}
      animate={{
        opacity: isMenuOpen ? 0 : 1,
        scaleX: isMenuOpen ? 0 : 1,
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    />
    <motion.span
      className={`w-full h-0.5 block rounded-full transition-colors duration-300 ${
        isMenuOpen ? 'bg-[#08f9ff]' : 'bg-white group-hover:bg-[#08f9ff]'
      }`}
      animate={{
        rotate: isMenuOpen ? -45 : 0,
        y: isMenuOpen ? -8 : 0,
        originX: 0.5,
        originY: 0.5
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  </div>
</motion.button>
        </div>
      </nav>

      {/* Mobile Navigation - Moved outside nav container for full width */}
      <motion.div
        className="lg:hidden overflow-hidden fixed left-0 right-0 top-20 z-[10008] bg-gradient-to-b from-black/98 via-black/95 to-black/90 backdrop-blur-xl border-t border-[#08f9ff]/20"
        style={{ isolation: 'isolate' }}
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{ 
                  duration: 0.2, 
                  delay: isMenuOpen ? index * 0.05 : 0,
                  ease: 'easeOut'
                }}
                whileTap={{ scale: 0.98 }}
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

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <motion.div
          className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-[10011] flex flex-col"
          style={{ isolation: 'isolate' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search tools, libraries, resources..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-4 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#08f9ff] focus:bg-gray-800/70 transition-all duration-300"
                  autoFocus
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <motion.button
                className="w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-gray-800/50 transition-colors duration-200 relative z-[10012]"
                onClick={toggleSearch}
                whileTap={{ scale: 0.95 }}
                style={{ isolation: 'isolate' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Mobile Search Results */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-gray-800/50 transition-colors duration-200"
                    onClick={() => handleSearchItemClick(result)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium">{result.title}</h4>
                          {result.url && (
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{result.description}</p>
                      </div>
                      <span className="text-[#08f9ff] text-xs bg-[#08f9ff]/20 px-2 py-1 rounded ml-3">
                        {result.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : searchQuery.trim() !== '' ? (
              <div className="text-center text-gray-400 mt-8">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>No results found for &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-8">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>Start typing to search...</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

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