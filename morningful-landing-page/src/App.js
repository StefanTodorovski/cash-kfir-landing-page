import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/home/HeroSection';
import StatsSection from './components/home/StatsSection';
import FeaturesSection from './components/home/FeaturesSection';
import SolutionsSection from './components/home/SolutionsSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import CTASection from './components/home/CTASection';

function App() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}

export default App;
