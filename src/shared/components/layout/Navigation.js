import React from 'react';
import { Button } from '../ui/Button';
import { APP_CONFIG } from '../../config/environment';

const Navigation = () => {
  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-[#1a2332]">
              {APP_CONFIG.APP_NAME}
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.label}
                  className="text-gray-600 hover:text-[#00d4ff] transition-colors"
                  onClick={() => {
                    // Smooth scroll to section
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-[#00d4ff]"
            >
              Sign In
            </Button>
            <Button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332]">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
