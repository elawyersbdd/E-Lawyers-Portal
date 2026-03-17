import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Smile } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RoutePath } from '../../types';
import { auth, googleProvider, facebookProvider } from '../../services/firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup, signOut } from 'firebase/auth';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with full name
      await updateProfile(user, {
        displayName: fullName
      });

      // Send verification email
      await sendEmailVerification(user);

      // Sign out immediately as per requirement (do not auto-login)
      await signOut(auth);

      // Redirect to verification screen
      navigate(RoutePath.VERIFY_EMAIL, { 
        state: { email } 
      });
    } catch (err: any) {
      console.error('Signup error:', err);
      alert(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: any) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate(RoutePath.HOME);
    } catch (err: any) {
      console.error("Social login error:", err);
      alert(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F4F6F9] font-sans selection:bg-indigo-500/20">
      
      {/* Cinematic Background - VisionOS Style */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
         {/* Animated Gradients */}
         <div className="absolute top-[-20%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-indigo-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '9s' }} />
         <div className="absolute bottom-[-20%] left-[-10%] w-[90vw] h-[90vw] rounded-full bg-sky-100/40 blur-[140px] mix-blend-multiply animate-pulse" style={{ animationDuration: '11s', animationDelay: '2s' }} />
         <div className="absolute top-[30%] right-[40%] w-[60vw] h-[60vw] rounded-full bg-violet-100/30 blur-[120px] mix-blend-multiply" />
         
         {/* Noise Texture */}
         <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* Main Container - Floating Effect */}
      <div className="relative w-full max-w-[440px] px-6 transition-all duration-700 ease-out hover:-translate-y-2">
        
        {/* Liquid Glass Card */}
        <div className="group relative overflow-hidden rounded-[36px] border border-white/60 bg-white/40 p-8 sm:p-10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.08),0_10px_20px_-5px_rgba(0,0,0,0.04)] backdrop-blur-[50px] transition-all duration-500 hover:shadow-[0_45px_80px_-12px_rgba(0,0,0,0.12),0_15px_30px_-5px_rgba(0,0,0,0.06)] hover:bg-white/50">
          
          {/* Specular Top Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-100 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Header Icon */}
            <div className="mb-8 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
               <div className="flex items-center gap-4">
                 <img 
                   src="https://elawyersbd.com/wp-content/uploads/2024/12/Logo_E-Layers-02.png" 
                   alt="E-Lawyers Logo" 
                   className="h-16 w-auto"
                   referrerPolicy="no-referrer"
                 />
                 <span className="text-3xl font-bold tracking-tight text-slate-900">E-Lawyers</span>
               </div>
               <span className="mt-2 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.2em]">legal and business consultancy firm</span>
            </div>

            {/* Typography */}
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 drop-shadow-sm text-center">
              Create Account
            </h1>
            <p className="mt-2.5 text-[15px] font-medium text-slate-500 text-center max-w-[280px] leading-relaxed">
              Join the E-Lawyers professional community.
            </p>
          
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10 w-full space-y-6">
              <div className="space-y-4">
                <Input 
                  id="fullName"
                  name="fullName"
                  type="text" 
                  required
                  placeholder="Full Name" 
                  icon={User}
                  className="bg-white/60 focus:bg-white"
                />
                <Input 
                  id="email"
                  name="email"
                  type="email" 
                  autoComplete="email" 
                  required
                  placeholder="name@example.com" 
                  icon={Mail}
                  className="bg-white/60 focus:bg-white"
                />
                <Input 
                  id="password" 
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Create a password" 
                  icon={Lock}
                  className="bg-white/60 focus:bg-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-[52px] text-[15px] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] mt-2" 
                isLoading={loading}
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
             <div className="my-8 flex w-full items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white/30 px-2 py-1 rounded-md backdrop-blur-md border border-white/40">Or</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
             </div>

             {/* Social Buttons */}
             <div className="flex w-full flex-col gap-3">
               <Button 
                  variant="secondary" 
                  type="button"
                  onClick={() => handleSocialLogin(googleProvider)}
                  disabled={loading}
                  className="w-full h-[52px] gap-3 bg-white/80 border-white shadow-sm hover:bg-white"
               >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-slate-700 font-semibold">Continue with Google</span>
               </Button>
               
               <Button 
                  variant="secondary" 
                  type="button"
                  onClick={() => handleSocialLogin(facebookProvider)}
                  disabled={loading}
                  className="w-full h-[52px] gap-3 bg-white/80 border-white shadow-sm hover:bg-white"
               >
                  <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-slate-700 font-semibold">Continue with Facebook</span>
               </Button>
             </div>

             {/* Footer */}
             <p className="mt-8 text-[13px] text-slate-500 font-medium">
               Already have an account? <Link to={RoutePath.LOGIN} className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors hover:underline decoration-2 underline-offset-2">Sign in</Link>
             </p>

          </div>
        </div>

      </div>
    </div>
  );
};
