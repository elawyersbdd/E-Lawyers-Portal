import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, BookOpen, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { RoutePath } from '../types';

const SUMMARY_ITEMS = [
  {
    title: 'Legal Services',
    description: 'Expert legal advisory and corporate support for your business.',
    icon: Gavel,
    path: RoutePath.LEGAL_SERVICES,
    color: 'indigo'
  },
  {
    title: 'Resources',
    description: 'Access professional tools, finders, and legal calculators.',
    icon: BookOpen,
    path: RoutePath.RESOURCES,
    color: 'emerald'
  },
  {
    title: 'Academy',
    description: 'Practical training programs for legal and tax professionals.',
    icon: GraduationCap,
    path: RoutePath.ACADEMY,
    color: 'violet'
  },
  {
    title: 'Appointment',
    description: 'Book a consultation session with our expert consultants.',
    icon: Calendar,
    path: RoutePath.APPOINTMENT,
    color: 'blue'
  }
];

const ServiceSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUMMARY_ITEMS.map((item, index) => (
          <motion.button
            key={item.title}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative p-8 rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 text-left overflow-hidden"
          >
            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300 mb-6`}>
                <item.icon size={24} strokeWidth={2} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                <span>Visit Page</span>
                <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>

            {/* Subtle hover glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-colors" />
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default ServiceSummary;
