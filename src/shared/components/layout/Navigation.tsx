import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';

const LogoWordmark = () => {
  const [wordmarkWidth, setWordmarkWidth] = useState<number | null>(null);
  const boldImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const boldImage = boldImageRef.current;
    if (boldImage) {
      const updateWidth = () => {
        if (boldImage.naturalWidth && boldImage.naturalHeight) {
          const aspectRatio = boldImage.naturalWidth / boldImage.naturalHeight;
          const currentHeight = boldImage.offsetHeight;
          setWordmarkWidth(currentHeight * aspectRatio);
        }
      };

      if (boldImage.complete) {
        updateWidth();
      } else {
        boldImage.onload = updateWidth;
      }

      // Update on resize
      const resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(boldImage);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      className="relative h-5 sm:h-6 lg:h-7 flex-shrink-0"
      style={{ width: wordmarkWidth ? `${wordmarkWidth}px` : 'auto' }}
    >
      <img
        ref={boldImageRef}
        src="/images/logos/logo-main-bold.png"
        alt="Morningful AI"
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      />
      <img
        src="/images/logos/logo-main-cyan.png"
        alt="Morningful AI"
        className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
};

interface NavigationProps {
  onJoinBetaWaitlist?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onJoinBetaWaitlist }) => {
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Resources', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button
              className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative h-8 sm:h-10 lg:h-12 flex-shrink-0">
                <img
                  src="/images/logos/logo-icon-blue.svg"
                  alt="Morningful AI Logo"
                  className="h-8 sm:h-10 lg:h-12 w-auto block shadow-lg transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/images/logos/logo-icon-cyan.svg"
                  alt="Morningful AI Logo"
                  className="absolute inset-0 h-full w-full object-contain shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <LogoWordmark />
            </button>
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.label}
                  className="relative group text-gray-700 font-medium hover:text-[#00d4ff] transition-colors duration-300"
                  onClick={() => {
                    // Smooth scroll to section
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.label}
                  <span className="w-0 h-0.5 bg-[#00d4ff] absolute -bottom-1 left-0 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="px-2 sm:px-3 text-xs sm:text-sm"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={onJoinBetaWaitlist}
              className="px-2 sm:px-6 bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Join Beta Waitlist</span>
              <span className="sm:hidden">Join Beta</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
