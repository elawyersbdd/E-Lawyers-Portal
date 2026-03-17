import React from 'react';
import { 
  Gavel, Scale, Building2, Calculator, Users, GraduationCap, 
  ShieldCheck, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import ServiceSummary from '../../components/ServiceSummary';

const SERVICES = [
  {
    title: 'Legal Services',
    description: 'Personal and corporate legal advisory, litigation support, contract drafting and review, regulatory compliance, and legal risk management.',
    icon: Gavel,
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    link: 'https://elawyersbd.com/legal-services/'
  },
  {
    title: 'Tax & VAT Management',
    description: 'Individual income tax, corporate tax planning, VAT registration and compliance, audit support, and tax optimization.',
    icon: Scale,
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    link: 'https://elawyersbd.com/tax-vat-management-services/'
  },
  {
    title: 'Corporate Support',
    description: 'Business setup, company registration, RJSC services, BIDA approval, corporate structuring, and regulatory compliance.',
    icon: Building2,
    color: 'blue',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    link: 'https://elawyersbd.com/corporate-support-services/'
  },
  {
    title: 'Finance & Accounting',
    description: 'Bookkeeping, accounting, financial reporting, payroll management, budgeting, and expense control.',
    icon: Calculator,
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/20',
    link: 'https://elawyersbd.com/finance-accounting-services/'
  },
  {
    title: 'HR & Payroll Management',
    description: 'HR policy development, recruitment, attendance and performance tracking, payroll processing, and labor law compliance.',
    icon: Users,
    color: 'rose',
    gradient: 'from-rose-500/20 to-pink-500/20',
    link: 'https://elawyersbd.com/hr-payroll-management-services/'
  },
  {
    title: 'Training & Academy Programs',
    description: 'E-Lawyers Academy offers specialized professional training programs and courses, including Tax, VAT, Bar Council & High Court exam preparation, and finance and technical topics.',
    icon: GraduationCap,
    color: 'violet',
    gradient: 'from-violet-500/20 to-purple-500/20',
    link: 'https://academy.elawyersbd.com/'
  }
];

const LegalServices: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-700 pb-20">
      
      {/* Background Ambient Light */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-white/90 via-white/50 to-indigo-50/40 backdrop-blur-[80px] p-10 sm:p-14 shadow-[0_30px_90px_-20px_rgba(50,60,100,0.1)] ring-1 ring-white/60"
      >
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-600/5 border border-indigo-600/10 text-indigo-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={12} className="text-indigo-500 animate-pulse" />
            <span>Professional Excellence</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8"
          >
            E-Lawyers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">Services</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-3xl"
          >
            At E-Lawyers, we are dedicated to delivering unparalleled legal and business solutions tailored to meet your needs. Our expert team combines profound legal, financial, and corporate expertise to provide end-to-end professional services.
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {SERVICES.map((service, index) => (
          <motion.a
            key={service.title}
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.5, duration: 0.6 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative p-8 rounded-[2.5rem] border border-white/70 bg-white/40 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(50,60,100,0.08)] transition-all duration-500 overflow-hidden block"
          >
            {/* Background Gradient Glow */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${service.gradient} blur-[80px] rounded-full transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-40`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:text-indigo-600 group-hover:shadow-indigo-500/10 transition-all duration-500`}>
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 font-medium leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-2.5 text-indigo-600 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                <span>Explore Service</span>
                <div className="w-6 h-[1.5px] bg-indigo-600 rounded-full" />
                <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Service Summary Section */}
      <div className="space-y-6 relative z-10 pt-10">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quick Access</h2>
        </div>
        <ServiceSummary />
      </div>
    </div>
  );
};

export default LegalServices;
