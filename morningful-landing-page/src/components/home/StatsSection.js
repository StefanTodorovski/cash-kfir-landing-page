import React from 'react';
import { motion } from 'framer-motion';

const stats = [
 { value: '$1B+', label: 'Transactions Analyzed' },
 { value: '99.98%', label: 'Data Accuracy' },
 { value: '500+', label: 'Finance Teams Onboarded' },
 { value: '24/7', label: 'Dedicated Support' }
];

export default function StatsSection() {
 return (
   <section className="py-16 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
     <div className="max-w-7xl mx-auto px-6 lg:px-8">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
         {stats.map((stat, index) => (
           <motion.div
             key={stat.label}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1, duration: 0.6 }}
             className="text-center group hover:scale-105 transition-transform duration-300"
           >
             <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1a2332] to-[#00d4ff] mb-2">
               {stat.value}
             </div>
             <div className="text-gray-600 font-medium">
               {stat.label}
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </section>
 );
}
