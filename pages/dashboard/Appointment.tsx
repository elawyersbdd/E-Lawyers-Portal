import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import ServiceSummary from '../../components/ServiceSummary';

const Appointment: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 pb-20">
      
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
            <span>Expert Consultation</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8"
          >
            Schedule an <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">Appointment</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-3xl"
          >
            Book a session with our expert legal and business consultants. Choose a time that works best for you and get the professional guidance you need.
          </motion.p>
        </div>
      </motion.section>

      {/* Appointment Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {[
          { icon: Clock, title: 'Flexible Timing', desc: 'Choose from available slots that fit your schedule.' },
          { icon: Globe, title: 'Virtual Meeting', desc: 'Connect with us from anywhere via secure video call.' },
          { icon: ShieldCheck, title: 'Secure & Private', desc: 'Your consultation is strictly confidential and protected.' }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="p-6 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-sm flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar Iframe Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative z-10 rounded-[2.5rem] border border-white/80 bg-white/60 backdrop-blur-[40px] shadow-[0_40px_100px_-20px_rgba(50,60,100,0.12)] overflow-hidden ring-1 ring-white/60"
      >
        <div className="p-1 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10" />
        <div className="w-full min-h-[700px] flex items-center justify-center bg-white/40">
          {/* Google Calendar Appointment Scheduling begin */}
          <iframe 
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0DbcAgddX73K62AZby23Vv4tWfdvzmA4v5enm9td0_gsHmT5r7ZlDtSS6BUKz_LDEbtMUsXFBK?gv=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="700" 
            frameBorder="0"
            title="Appointment Scheduling"
            className="animate-in fade-in zoom-in-95 duration-1000 delay-500"
          ></iframe>
          {/* end Google Calendar Appointment Scheduling */}
        </div>
      </motion.div>

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

export default Appointment;
