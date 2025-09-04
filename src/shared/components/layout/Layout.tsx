import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onJoinBetaWaitlist?: () => void;
  onContactClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onJoinBetaWaitlist,
  onContactClick,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onJoinBetaWaitlist={onJoinBetaWaitlist} />
      <main className="pt-16">{children}</main>
      <Footer onContactClick={onContactClick} />
    </div>
  );
};

export default Layout;
