import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, Sparkles, ArrowRight, FolderOpen, FileText, ShieldCheck, Loader2, Scale, Gavel, BookOpen, Lock,
  Building2, Search, Percent, Receipt, Calculator, Wallet, Calendar, Briefcase, FileCheck, UserCheck, 
  ClipboardCheck, RefreshCw, History, TrendingUp, ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { RoutePath } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { noteService } from '../../services/noteService';
import ServiceSummary from '../../components/ServiceSummary';

const RESOURCES = [
  { name: 'Business Setup', icon: Building2 },
  { name: 'Tax Rate Finder', icon: Search },
  { name: 'VAT Rate Finder', icon: Percent },
  { name: 'Tax Rebate', icon: Receipt },
  { name: 'TDS Calculator', icon: Calculator },
  { name: 'Payroll Calculator', icon: Wallet },
  { name: 'Tax Liability', icon: Scale },
  { name: 'VAT & Tax', icon: FileText },
  { name: 'RJSC Deadlines', icon: Calendar },
  { name: 'Company Registration', icon: Briefcase },
  { name: 'Trade License', icon: FileCheck },
  { name: 'TIN Registration', icon: UserCheck },
  { name: 'VAT Registration', icon: ClipboardCheck },
  { name: 'Company Changes', icon: RefreshCw },
  { name: 'Trade License Renewal', icon: History },
  { name: 'Investment', icon: TrendingUp },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [noteCount, setNoteCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      if (isAuthenticated) {
        setIsCountLoading(true);
        try {
          const count = await noteService.getCount();
          setNoteCount(count);
        } catch (error) {
          console.error('Failed to fetch note count:', error);
          setNoteCount(0);
        } finally {
          setIsCountLoading(false);
        }
      }
    };

    fetchCount();
  }, [isAuthenticated]);

  const handleViewAllClick = () => {
    if (isAuthenticated) {
      navigate(RoutePath.NOTES);
    } else {
      navigate(RoutePath.LOGIN);
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 relative pb-20">
      
      {/* Background Ambient Light (Global) */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-slate-200/20 blur-[130px] rounded-full pointer-events-none z-0 mix-blend-multiply" />
      <div className="fixed top-[10%] right-[-15%] w-[600px] h-[600px] bg-indigo-100/30 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-multiply" />

      {/* Hero Section - Professional Legal Portal */}
      <div className="relative z-10 w-full rounded-[2.5rem] border border-white/80 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-[60px] p-10 sm:p-14 shadow-[0_30px_90px_-20px_rgba(50,60,100,0.1)] overflow-hidden group transition-all duration-500 hover:shadow-[0_45px_110px_-15px_rgba(50,60,100,0.15)] ring-1 ring-white/60">
        
        {/* Liquid Glass Internal Layers - Specular Highlights */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/5 to-transparent pointer-events-none opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-90" />
        
        <div className="relative z-10 flex flex-col items-start gap-8 max-w-3xl">
          {/* Top Tag Bar - Dual Badges */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 px-3 py-1 text-[11px] font-bold tracking-wide text-slate-800 uppercase shadow-sm backdrop-blur-md">
                <Gavel size={11} className="text-slate-700" />
                <span>Professional Portal</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-bold tracking-wide text-indigo-700 uppercase backdrop-blur-md">
                <ShieldCheck size={11} className="text-indigo-600" />
                <span>Verified Resources</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm">
              {isAuthenticated ? (
                <>Welcome back, <br /><span className="text-indigo-600">{user?.name || 'Counsel'}</span></>
              ) : (
                <>
                  Welcome to the <br />
                  <span className="text-indigo-600">E-Lawyers Resource Portal</span>
                </>
              )}
            </h1>
            
            <div className="space-y-4 max-w-2xl">
              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed tracking-normal">
                {isAuthenticated ? (
                  'Access your exclusive collection of professional resources, including the latest tax updates, legal insights, and essential tools—carefully curated for our valued users.'
                ) : (
                  <>
                    We are delighted to have you here. <br />
                    Access our exclusive collection of professional resources, including the latest tax updates, legal insights, and essential tools—carefully curated for our valued users.
                  </>
                )}
              </p>
              
              {!isAuthenticated && (
                <div className="flex flex-col gap-3 p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 backdrop-blur-sm">
                  <p className="text-indigo-900 font-semibold flex items-center gap-2">
                    <Lock size={18} className="text-indigo-600" />
                    To continue, please log in to your account.
                  </p>
                  <p className="text-indigo-700/80 text-sm font-medium">
                    👉 Click “Login” to proceed and unlock full access.
                  </p>
                </div>
              )}
              
              <p className="text-slate-500 text-base italic font-medium">
                Experience a seamless gateway to knowledge, compliance, and professional excellence.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            {!isAuthenticated && (
              <button 
                onClick={() => navigate(RoutePath.LOGIN)}
                className="group relative overflow-hidden rounded-full bg-gradient-to-b from-indigo-600 to-indigo-700 px-10 py-4 text-sm font-semibold text-white shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-10px_rgba(79,70,229,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:brightness-105 active:scale-[0.98] active:shadow-sm ring-1 ring-indigo-500/50"
              >
                <div className="flex items-center gap-2.5 relative z-10">
                  <span className="tracking-wide">Login to Portal</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="text-indigo-100 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transform transition-transform" style={{ transitionDuration: '1s' }} />
              </button>
            )}
            
            <button 
              onClick={handleViewAllClick}
              className="rounded-full bg-white/50 border border-slate-200 px-9 py-4 text-sm font-semibold text-slate-700 backdrop-blur-md transition-all hover:bg-white hover:border-slate-300 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen size={18} strokeWidth={2} className="text-slate-500" />
                <span className="tracking-wide">Browse Resources</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Service Summary Section */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quick Access</h2>
        </div>
        <ServiceSummary />
      </div>
    </div>
  );
};

export default Home;
