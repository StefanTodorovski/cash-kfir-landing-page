import React from 'react';
import { motion } from 'framer-motion';
import {
  useScrollAnimation,
  useStaggerAnimation,
} from '../../../shared/hooks/useAnimation';

const STATS_DATA = [
  { value: '$20M', label: 'Transactions Analyzed' },
  { value: '99.98%', label: 'Data Accuracy' },
  { value: '14+', label: 'Finance Teams Onboarded' },
  { value: '10,000+', label: 'Banks Supported' },
];

const StatsSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const stagger = useStaggerAnimation(0.1);

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS_DATA.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={stagger.item}
              whileHover={{ scale: 1.05 }}
              className="text-center group transition-transform duration-300"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1a2332] to-[#00d4ff] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
