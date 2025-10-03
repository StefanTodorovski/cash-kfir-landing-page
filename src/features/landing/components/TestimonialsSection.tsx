import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';

const TESTIMONIALS_DATA = [
  {
    name: 'Ido Genosar',
    role: 'CEO',
    company: 'Verobotics',
    avatar: '/images/avatars/ido.jpg',
    content:
      "Morningful more than pays for itself. We've streamlined cash management and earned 9X more in interest.",
    rating: 5,
  },
  {
    name: 'Shachar Kaufman',
    role: 'Founder',
    company: 'Zoma',
    avatar: '/images/avatars/shachar.jpg',
    content:
      'Every morning I open Morningful first, and it tells me exactly where the business stands in seconds.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { trackFeatureInteraction } = useAnalytics();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isInView } = useScrollAnimation();

  const nextTestimonial = () => {
    trackFeatureInteraction('testimonials', 'next_testimonial');
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    trackFeatureInteraction('testimonials', 'prev_testimonial');
    setCurrentIndex(
      prev => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length
    );
  };

  const handleDotClick = (index: number) => {
    trackFeatureInteraction('testimonials', `dot_click_${index}`);
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 bg-gradient-to-br from-[#1a2332] to-[#0f1419] text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#00d4ff]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
                  {[...Array(TESTIMONIALS_DATA[currentIndex].rating)].map(
                    (_, i) => (
                      <Star
                        key={`rating-star-${i}`}
                        className="w-6 h-6 text-[#00d4ff] fill-current"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-2xl lg:text-3xl font-medium text-white mb-8 leading-relaxed">
                  "{TESTIMONIALS_DATA[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={TESTIMONIALS_DATA[currentIndex].avatar}
                    alt={`${TESTIMONIALS_DATA[currentIndex].name}, ${TESTIMONIALS_DATA[currentIndex].role} at ${TESTIMONIALS_DATA[currentIndex].company}`}
                    className="w-16 h-16 rounded-full border-2 border-[#00d4ff]/50"
                  />
                  <div className="text-left">
                    <div className="font-bold text-white text-lg">
                      {TESTIMONIALS_DATA[currentIndex].name}
                    </div>
                    <div className="text-[#00d4ff]">
                      {TESTIMONIALS_DATA[currentIndex].role}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {TESTIMONIALS_DATA[currentIndex].company}
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
              {TESTIMONIALS_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
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
};

export default TestimonialsSection;
