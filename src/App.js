import React from 'react';
import { Layout, ErrorBoundary } from './shared/components';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  SolutionsSection,
  TestimonialsSection,
  CTASection,
} from './features/landing';
import { RequestDemoModal } from './features/demo-request';
import { useRequestDemo } from './shared/hooks';

function App() {
  const { isModalOpen, openModal, closeModal } = useRequestDemo();

  return (
    <ErrorBoundary>
      <Layout>
        <HeroSection onRequestDemo={openModal} />
        <StatsSection />
        <FeaturesSection />
        <SolutionsSection />
        <TestimonialsSection />
        <CTASection onRequestDemo={openModal} />
        <RequestDemoModal isOpen={isModalOpen} onClose={closeModal} />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
