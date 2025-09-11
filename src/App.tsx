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
import { BetaWaitlistModal } from './features/beta-waitlist';
import {
  useBetaWaitlist,
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
  const betaWaitlistHook = useBetaWaitlist();

  // Initialize analytics tracking
  useAnalytics();
  useScrollTracking();

  const contactHook = useContact();
  const privacyPolicyHook = usePrivacyPolicy();
  const termsOfServiceHook = useTermsOfService();

  return (
    <ErrorBoundary>
      <Layout
        onJoinBetaWaitlist={betaWaitlistHook.openModal}
        onContactClick={contactHook.openModal}
        onPrivacyPolicyClick={privacyPolicyHook.openModal}
        onTermsOfServiceClick={termsOfServiceHook.openModal}
      >
        <HeroSection onJoinBetaWaitlist={betaWaitlistHook.openModal} />
        <StatsSection />
        <FeaturesSection />
        <SolutionsSection onJoinBetaWaitlist={betaWaitlistHook.openModal} />
        <TestimonialsSection />
        <CTASection
          onJoinBetaWaitlist={betaWaitlistHook.openModal}
          onContactClick={contactHook.openModal}
        />
        <BetaWaitlistModal
          isOpen={betaWaitlistHook.isModalOpen}
          onClose={betaWaitlistHook.closeModal}
          betaHook={betaWaitlistHook}
        />
        <ContactModal
          isOpen={contactHook.isModalOpen}
          onClose={contactHook.closeModal}
          contactHook={contactHook}
        />
        <PrivacyPolicyModal
          isOpen={privacyPolicyHook.isModalOpen}
          onClose={privacyPolicyHook.closeModal}
          onTermsOfServiceClick={termsOfServiceHook.openModal}
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
