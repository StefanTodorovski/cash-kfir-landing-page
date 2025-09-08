import React from 'react';
import { APP_CONFIG } from '../../config/environment';

interface FooterProps {
  onContactClick?: () => void;
  onPrivacyPolicyClick?: () => void;
  onTermsOfServiceClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onPrivacyPolicyClick,
  onTermsOfServiceClick,
}) => {
  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
    { label: 'Integrations', href: '#integrations' },
  ];

  const companyLinks = [
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blog' },
  ];

  const socialLinks = [
    { label: 'Facebook', href: APP_CONFIG.SOCIAL_LINKS.FACEBOOK, icon: 'f' },
    { label: 'Twitter', href: APP_CONFIG.SOCIAL_LINKS.TWITTER, icon: 't' },
    { label: 'LinkedIn', href: APP_CONFIG.SOCIAL_LINKS.LINKEDIN, icon: 'in' },
  ];

  return (
    <footer className="bg-[#1a2332] text-white py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <img
                src="/images/logos/transparent.png"
                alt="Logo"
                className="h-32 sm:h-36 md:h-40 lg:h-44 w-auto block"
              />
            </div>
            <p className="text-gray-300 max-w-md">
              Empowering finance teams with intelligent money management and
              real-time cash flow visibility.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00d4ff] transition-colors cursor-pointer"
                  aria-label={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300">
              {productLinks.map(link => (
                <li key={link.label}>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              {companyLinks.map(link => (
                <li key={link.label}>
                  <button className="hover:text-[#00d4ff] transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-[#00d4ff] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.COMPANY_NAME}. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={onPrivacyPolicyClick}
              className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onTermsOfServiceClick}
              className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
