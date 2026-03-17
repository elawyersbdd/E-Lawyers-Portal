import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { RoutePath } from '../../types';

export const EmailVerification: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email address';

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F4F6F9] font-sans selection:bg-indigo-500/20">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] rounded-full bg-emerald-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
         <div className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-blue-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-[480px] px-6">
        <div className="overflow-hidden rounded-[36px] border border-white/60 bg-white/40 p-10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.08)] backdrop-blur-[50px] text-center">
          
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Mail size={40} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Verify your email</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            We have sent you a verification email to <span className="font-bold text-slate-900">{email}</span>. 
            Verify it and log in to access your portal.
          </p>

          <div className="mt-10 space-y-4">
            <Link to={RoutePath.LOGIN}>
              <Button className="w-full h-[52px] gap-2 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] bg-emerald-600 hover:bg-emerald-700">
                Go to Login <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-[13px] text-slate-500 font-medium">
            Didn't receive the email? Check your spam folder or <button onClick={() => window.location.reload()} className="font-bold text-indigo-600 hover:underline">try again</button>
          </p>
        </div>
      </div>
    </div>
  );
};
