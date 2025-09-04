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
import { useRequestDemo, useAnalytics, useScrollTracking } from './shared/hooks';

function App() {
  const demoHook = useRequestDemo();
  
  // Initialize analytics tracking
  useAnalytics();
  useScrollTracking();

  return (
    <ErrorBoundary>
      <Layout>
        <HeroSection onRequestDemo={demoHook.openModal} />
        <StatsSection />
        <FeaturesSection />
        <SolutionsSection />
        <TestimonialsSection />
        <CTASection onRequestDemo={demoHook.openModal} />
        <RequestDemoModal
          isOpen={demoHook.isModalOpen}
          onClose={demoHook.closeModal}
          demoHook={demoHook}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
