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
import {
  useRequestDemo,
  useAnalytics,
  useScrollTracking,
} from './shared/hooks';
import { ContactModal } from './features/contact';
import { useContact } from './shared/hooks';

function App() {
  const demoHook = useRequestDemo();

  // Initialize analytics tracking
  useAnalytics();
  useScrollTracking();

  const contactHook = useContact();

  return (
    <ErrorBoundary>
      <Layout
        onJoinBetaWaitlist={demoHook.openModal}
        onContactClick={contactHook.openModal}
      >
        <HeroSection onRequestDemo={demoHook.openModal} />
        <StatsSection />
        <FeaturesSection />
        <SolutionsSection />
        <TestimonialsSection />
        <CTASection
          onRequestDemo={demoHook.openModal}
          onContactClick={contactHook.openModal}
        />
        <RequestDemoModal
          isOpen={demoHook.isModalOpen}
          onClose={demoHook.closeModal}
          demoHook={demoHook}
        />
        <ContactModal
          isOpen={contactHook.isModalOpen}
          onClose={contactHook.closeModal}
          contactHook={contactHook}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
