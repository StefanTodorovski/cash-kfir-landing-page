import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1a2332] to-[#0f1419] text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00d4ff] to-transparent opacity-10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-l from-[#00d4ff] to-transparent opacity-5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
              <div className="text-sm text-gray-400">
                Trusted by 500+ companies
              </div>
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

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                whileHover={{ y: -8, rotateX: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300">
                        Financial Command Center
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-[#00d4ff]">
                      99.98%
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-[#00d4ff]/20 to-transparent p-4 rounded-xl border border-[#00d4ff]/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">
                          Cash Flow Analysis
                        </span>
                        <span className="text-[#00d4ff] font-semibold">
                          $12.4M / month
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ delay: 1, duration: 2 }}
                          className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-white">14</div>
                        <div className="text-xs text-gray-400">
                          Connected Accounts
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-[#00d4ff]">
                          ~5min
                        </div>
                        <div className="text-xs text-gray-400">Data Sync</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#00d4ff] to-[#0099cc] rounded-2xl shadow-lg flex items-center justify-center"
              >
                <div className="text-2xl">⚡</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-2 -left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
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
      </div>
    </section>
  );
}
