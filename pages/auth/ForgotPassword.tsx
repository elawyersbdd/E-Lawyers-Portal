import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RoutePath } from '../../types';
import { auth } from '../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      alert(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F4F6F9] font-sans selection:bg-indigo-500/20">
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
           <div className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] rounded-full bg-emerald-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        <div className="relative w-full max-w-[480px] px-6">
          <div className="overflow-hidden rounded-[36px] border border-white/60 bg-white/40 p-10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.08)] backdrop-blur-[50px] text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle size={40} />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Check your email</h1>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
              We sent you a password change link to <span className="font-bold text-slate-900">{email}</span>.
            </p>
            <div className="mt-10">
              <Link to={RoutePath.LOGIN}>
                <Button className="w-full h-[52px] gap-2 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] bg-emerald-600 hover:bg-emerald-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F4F6F9] font-sans selection:bg-indigo-500/20">
      
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-indigo-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '9s' }} />
         <div className="absolute bottom-[-20%] left-[-10%] w-[90vw] h-[90vw] rounded-full bg-sky-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '11s', animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-[440px] px-6">
        <div className="overflow-hidden rounded-[36px] border border-white/60 bg-white/40 p-8 sm:p-10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.08)] backdrop-blur-[50px]">
          
          <Link to={RoutePath.LOGIN} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-8 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to login
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Forgot password?</h1>
          <p className="mt-2.5 text-[15px] font-medium text-slate-500 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <Input 
              id="email"
              name="email"
              type="email" 
              autoComplete="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              icon={Mail}
              className="bg-white/60 focus:bg-white"
            />
            
            <Button 
              type="submit" 
              className="w-full h-[52px] text-[15px] gap-2 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)]" 
              isLoading={loading}
            >
              Get reset Link <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
