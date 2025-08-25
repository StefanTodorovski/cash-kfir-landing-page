import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CFO',
    company: 'Innovate Inc.',
    avatar: '/images/avatars/sarah-chen.jpg',
    content:
      "This platform has been a game-changer. We've gone from reactive reporting in spreadsheets to proactive cash management. I finally have a real-time pulse on the business.",
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'VP of Finance',
    company: 'ScaleUp Co.',
    avatar: '/images/avatars/marcus-rodriguez.jpg',
    content:
      'The ability to forecast our cash position with accuracy has been invaluable. We identified a potential shortfall two months out and adjusted our strategy, saving us from a serious crunch.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Head of Finance',
    company: 'NextGen Solutions',
    avatar: '/images/avatars/emily-watson.jpg',
    content:
      "Implementation was seamless. We connected all our accounts in under an hour. It's the single source of truth for our finances and has made board reporting 10x easier.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#1a2332] to-[#0f1419] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#00d4ff]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Forward-Thinking
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
              {' '}
              CFOs
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from finance leaders who have transformed their operations with
            our platform.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 lg:p-12 shadow-2xl">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={`rating-star-${i}`}
                      className="w-6 h-6 text-[#00d4ff] fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-2xl lg:text-3xl font-medium text-white mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={`${testimonials[currentIndex].name}, ${testimonials[currentIndex].role} at ${testimonials[currentIndex].company}`}
                    className="w-16 h-16 rounded-full border-2 border-[#00d4ff]/50"
                  />
                  <div className="text-left">
                    <div className="font-bold text-white text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-[#00d4ff]">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-[#00d4ff] hover:text-[#00d4ff]"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#00d4ff] scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:border-[#00d4ff] hover:text-[#00d4ff]"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
