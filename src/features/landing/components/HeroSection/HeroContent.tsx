import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../../../../shared/components/ui/Button';
import { ANIMATION_VARIANTS } from '../../../../shared/constants/ui';

type HeroContentProps = {
  onRequestDemo: () => void;
};

const HeroContent: React.FC<HeroContentProps> = ({ onRequestDemo }) => {
  return (
    <motion.div
      {...ANIMATION_VARIANTS.fadeInUp}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-sm text-[#00d4ff] font-medium"
      >
        <span className="w-2 h-2 bg-[#00d4ff] rounded-full mr-2 animate-pulse" />
        Built for Modern Finance Teams
      </motion.div>

      <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Master Your
        </span>
        <br />
        <span className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] bg-clip-text text-transparent">
          Company's Cash Flow
        </span>
      </h1>

      <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
        Our intelligent money management app gives finance teams real-time
        visibility into their cash flow, empowering smarter, data-driven
        decisions for all operations.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          size="lg"
          onClick={onRequestDemo}
          className="bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] font-semibold px-8 py-4 h-auto text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/25"
        >
          Request a Demo
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40 px-8 py-4 h-auto text-lg rounded-xl transition-all duration-300"
        >
          <Play className="mr-2 w-5 h-5" />
          Watch Overview
        </Button>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex items-center space-x-8 pt-8"
      >
        <div className="text-sm text-gray-400">Trusted by 500+ companies</div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`trust-indicator-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
            >
              <div className="w-2 h-2 bg-[#00d4ff] rounded-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};



export default HeroContent;
