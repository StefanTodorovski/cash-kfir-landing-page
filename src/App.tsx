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
  useContact,
  usePrivacyPolicy,
  useTermsOfService,
} from './shared/hooks';
import { ContactModal } from './features/contact';
import { PrivacyPolicyModal } from './features/privacy-policy';
import { TermsOfServiceModal } from './features/terms-of-service';

function App() {
  const demoHook = useRequestDemo();

  // Initialize analytics tracking
  useAnalytics();
  useScrollTracking();

  const contactHook = useContact();
  const privacyPolicyHook = usePrivacyPolicy();
  const termsOfServiceHook = useTermsOfService();

  return (
    <ErrorBoundary>
      <Layout
        onJoinBetaWaitlist={demoHook.openModal}
        onContactClick={contactHook.openModal}
        onPrivacyPolicyClick={privacyPolicyHook.openModal}
        onTermsOfServiceClick={termsOfServiceHook.openModal}
      >
        <HeroSection onRequestDemo={demoHook.openModal} />
        <StatsSection />
        <FeaturesSection />
        <SolutionsSection onRequestDemo={demoHook.openModal} />
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
        <PrivacyPolicyModal
          isOpen={privacyPolicyHook.isModalOpen}
          onClose={privacyPolicyHook.closeModal}
        />
        <TermsOfServiceModal
          isOpen={termsOfServiceHook.isModalOpen}
          onClose={termsOfServiceHook.closeModal}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
