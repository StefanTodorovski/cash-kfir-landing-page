import React from 'react';
import { Button } from './ui/button';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-[#1a2332]">Base44</div>
              <div className="hidden md:flex space-x-8">
                <button className="text-gray-600 hover:text-[#00d4ff] transition-colors">
                  Features
                </button>
                <button className="text-gray-600 hover:text-[#00d4ff] transition-colors">
                  Solutions
                </button>
                <button className="text-gray-600 hover:text-[#00d4ff] transition-colors">
                  Pricing
                </button>
                <button className="text-gray-600 hover:text-[#00d4ff] transition-colors">
                  About
                </button>
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

      {/* Main content with top padding for fixed nav */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1a2332] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold mb-4">Base44</div>
              <p className="text-gray-300 max-w-md">
                Empowering finance teams with intelligent money management and
                real-time cash flow visibility.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00d4ff] transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00d4ff] transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00d4ff] transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Security
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Integrations
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    Blog
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Base44. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
