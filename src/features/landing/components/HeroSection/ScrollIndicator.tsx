import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center text-gray-400"
      >
        <span className="text-sm mb-2">Discover More</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-1 bg-gray-400 rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
