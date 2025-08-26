import React, { useState } from 'react';
import Layout from './components/Layout';
import HeroSection from './components/home/HeroSection';
import StatsSection from './components/home/StatsSection';
import FeaturesSection from './components/home/FeaturesSection';
import SolutionsSection from './components/home/SolutionsSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import CTASection from './components/home/CTASection';
import RequestDemoModal from './components/ui/RequestDemoModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <HeroSection onRequestDemo={openModal} />
      <StatsSection />
      <FeaturesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <CTASection onRequestDemo={openModal} />
      <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
}

export default App;
