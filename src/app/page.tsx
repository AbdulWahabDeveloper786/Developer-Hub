'use client';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ResourceDatabaseSection from '@/components/sections/ResourceDatabaseSection';
import ToolsSection from '@/components/sections/ToolsSection';
import LibrariesSection from '@/components/sections/LibrariesSection';
import FrameworksSection from '@/components/sections/FrameworksSection';
import LibrariesFrameworksSection from '@/components/sections/LibrariesFrameworksSection';
import AboutSection from '@/components/sections/AboutSection';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';


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
