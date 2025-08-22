import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Shield, Users, TrendingUp, PieChart, Link as LinkIcon } from 'lucide-react';

const features = [
 {
   icon: BarChart3,
   title: 'Real-Time Cash Flow',
   description: 'Connect all bank accounts and financial tools for a unified, up-to-the-second view of your cash position.',
   color: 'from-blue-400 to-cyan-500'
 },
 {
   icon: Shield,
   title: 'Bank-Level Security',
   description: 'Bank-grade encryption and compliance with SOC2, GDPR, and other global standards to keep your data safe.',
   color: 'from-green-400 to-emerald-500'
 },
 {
   icon: Users,
   title: 'Team-Ready Collaboration',
   description: 'Empower your entire finance team with multi-user access, custom roles, and shared reporting to streamline work.',
   color: 'from-purple-400 to-pink-500'
 },
 {
   icon: TrendingUp,
   title: 'Smart Forecasting',
   description: 'Leverage AI-powered insights to predict future cash flow, identify trends, and mitigate risks before they happen.',
   color: 'from-yellow-400 to-orange-500'
 },
 {
   icon: PieChart,
   title: 'Actionable Insights',
   description: 'Drill down into spending categories, revenue streams, and operational costs with powerful, intuitive analytics.',
   color: 'from-indigo-400 to-blue-500'
 },
 {
   icon: LinkIcon,
   title: 'Seamless Integration',
   description: 'Connects with your existing accounting software, ERPs, and banking partners to become your single source of truth.',
   color: 'from-teal-400 to-cyan-500'
 }
];

export default function FeaturesSection() {
 return (
   <section className="py-24 bg-white">
     <div className="max-w-7xl mx-auto px-6 lg:px-8">
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="text-center mb-16"
       >
         <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6">
           Your Financial
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]"> Command Center</span>
         </h2>
         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
           A comprehensive toolset designed to give finance teams complete control and clarity over their company's financial health.
         </p>
       </motion.div>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         {features.map((feature, index) => (
           <motion.div
             key={feature.title}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1, duration: 0.6 }}
             whileHover={{ y: -8, scale: 1.02 }}
             className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
           >
             {/* Background gradient on hover */}
             <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
             <div className="relative">
               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-3 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                 <feature.icon className="w-8 h-8 text-white" />
               </div>
              
               <h3 className="text-2xl font-bold text-[#1a2332] mb-4 group-hover:text-[#00d4ff] transition-colors duration-300">
                 {feature.title}
               </h3>
              
               <p className="text-gray-600 leading-relaxed">
                 {feature.description}
               </p>
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </section>
 );
}
