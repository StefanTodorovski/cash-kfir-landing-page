import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, Activity, PiggyBank, Briefcase, ShieldCheck } from 'lucide-react';

const solutions = [
 {
   icon: Activity,
   title: 'Cash Flow Management',
   description: 'Monitor inflows and outflows in real-time. Understand your cash conversion cycle and optimize working capital.',
   image: 'https://images.unsplash.com/photo-1632239522610-c1e031b731b2?w=600&h=400&fit=crop&crop=center&q=80',
   features: ['Real-time Balance Monitoring', 'Cash Conversion Cycle', 'Working Capital Optimization']
 },
 {
   icon: PiggyBank,
   title: 'Expense & Spend Control',
   description: 'Categorize spending automatically and identify areas for cost savings with detailed expense analytics and controls.',
   image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=600&h=400&fit=crop&crop=center&q=80',
   features: ['Automated Categorization', 'Budget vs. Actuals', 'Identify Savings']
 },
 {
   icon: Briefcase,
   title: 'Financial Planning & Analysis (FP&A)',
   description: 'Build dynamic financial models, run scenario analyses, and create board-ready reports with confidence and ease.',
   image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&h=400&fit=crop&crop=center&q=80',
   features: ['Dynamic Modeling', 'Scenario Analysis', 'Board-Ready Reports']
 },
 {
   icon: ShieldCheck,
   title: 'Treasury & Risk Management',
   description: 'Manage multiple currencies, hedge against FX risks, and ensure you have the right amount of cash, in the right place.',
   image: 'https://images.unsplash.com/photo-1665686306574-1ace09918530?w=600&h=400&fit=crop&crop=center&q=80',
   features: ['Multi-currency Management', 'FX Risk Hedging', 'Liquidity Planning']
 }
];

export default function SolutionsSection() {
 return (
   <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
     <div className="max-w-7xl mx-auto px-6 lg:px-8">
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="text-center mb-16"
       >
         <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6">
           Designed for Key
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]"> Financial Operations</span>
         </h2>
         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           Whether you're managing daily liquidity or planning for the next quarter, our platform provides the clarity you need.
         </p>
       </motion.div>

       <div className="grid lg:grid-cols-2 gap-12">
         {solutions.map((solution, index) => (
           <motion.div
             key={solution.title}
             initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: index * 0.2, duration: 0.8 }}
             className="group"
           >
             <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
               <div className="relative h-64 overflow-hidden">
                 <img
                   src={solution.image}
                   alt={`${solution.title} - Financial management illustration`}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                 <div className="absolute bottom-6 left-6">
                   <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                     <solution.icon className="w-6 h-6 text-white" />
                   </div>
                 </div>
               </div>
              
               <div className="p-8">
                 <h3 className="text-2xl font-bold text-[#1a2332] mb-4">
                   {solution.title}
                 </h3>
                 <p className="text-gray-600 mb-6 leading-relaxed">
                   {solution.description}
                 </p>
                
                 <ul className="space-y-3 mb-8">
                   {solution.features.map((feature, featureIndex) => (
                     <li key={featureIndex} className="flex items-center text-gray-600">
                       <div className="w-2 h-2 bg-[#00d4ff] rounded-full mr-3" />
                       {feature}
                     </li>
                   ))}
                 </ul>
                
                 <Button
                   variant="outline"
                   className="group/btn border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white"
                 >
                   Learn More
                   <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                 </Button>
               </div>
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </section>
 );
}
