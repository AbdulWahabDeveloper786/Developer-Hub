'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';

// Dynamic imports for code splitting
const ResourceDatabaseSection = dynamic(() => import('@/components/sections/ResourceDatabaseSection'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08f9ff]"></div></div>
});

const ToolsSection = dynamic(() => import('@/components/sections/ToolsSection'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08f9ff]"></div></div>
});

const LibrariesFrameworksSection = dynamic(() => import('@/components/sections/LibrariesFrameworksSection'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08f9ff]"></div></div>
});

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08f9ff]"></div></div>
});


export default function Home() {
  return (
    <>

      <CustomCursor />
      <ScrollProgress />
      
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <main className="pt-24 opacity-0 animate-fade-in" style={{animation: 'fadeIn 0.8s ease-out 0.5s forwards'}}>
          <HeroSection />
          <ResourceDatabaseSection />
          <ToolsSection />
          <LibrariesFrameworksSection />
        </main>
        <AboutSection />
      </div>
    </>
  );
}
