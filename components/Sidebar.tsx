import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Settings, LogOut, LogIn, BookOpen, GraduationCap, Gavel, Calendar, X, Calculator } from 'lucide-react';
import { RoutePath } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate(RoutePath.HOME);
  };

  const handleLogin = () => {
    if (onClose) onClose();
    navigate(RoutePath.LOGIN);
  };

  const handleNavClick = (path: string) => {
    if (onClose) onClose();
    navigate(path);
  };

  const navItems = [
    { icon: Home, label: 'Home', path: RoutePath.HOME },
    { icon: BookOpen, label: 'Resources', path: RoutePath.RESOURCES },
    { icon: GraduationCap, label: 'Academy', path: RoutePath.ACADEMY },
    { icon: Gavel, label: 'Legal Services', path: RoutePath.LEGAL_SERVICES },
    { icon: Calendar, label: 'Appointment', path: RoutePath.APPOINTMENT },
    { icon: Settings, label: 'Account', path: RoutePath.ACCOUNT },
  ];

  const getIsActive = (path: string) => {
    if (path === RoutePath.HOME) {
      return pathname === RoutePath.HOME;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/60 bg-white/45 backdrop-blur-2xl transition-transform duration-300 md:translate-x-0 md:flex md:flex-col shadow-[0_4px_15px_rgba(0,0,0,0.03)] ${
        isOpen ? 'translate-x-0 flex flex-col' : '-translate-x-full hidden md:flex'
      }`}>
        <div className="flex h-24 items-center px-8 justify-between">
          <Link to={RoutePath.HOME} onClick={onClose} className="flex items-center gap-3 text-slate-900 group cursor-pointer">
            <img 
              src="https://elawyersbd.com/wp-content/uploads/2024/12/Logo_E-Layers-02.png" 
              alt="E-Lawyers Logo" 
              className="h-12 w-auto transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-800 leading-none">E-Lawyers</span>
              <span className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">legal and business consultancy firm</span>
            </div>
          </Link>
          
          {/* Mobile Close Button */}
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = getIsActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 rounded-full px-5 py-3.5 text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-[0_4px_15_rgba(129,140,248,0.25)] translate-x-1'
                      : 'text-slate-600 font-medium hover:bg-white/50 hover:text-slate-900 hover:translate-x-1'
                  }`}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`transition-colors ${isActive ? "text-white" : "text-slate-500"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-white/30">
          {isAuthenticated ? (
              <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-full px-5 py-3.5 text-sm font-medium text-slate-600 hover:bg-white/50 hover:text-red-600 transition-all hover:shadow-sm"
              >
              <LogOut size={20} strokeWidth={2} className="opacity-70" />
              Sign Out
              </button>
          ) : (
              <button
              onClick={handleLogin}
              className="flex w-full items-center gap-3 rounded-full px-5 py-3.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all shadow-sm"
              >
              <LogIn size={20} strokeWidth={2} className="opacity-70" />
              Sign In
              </button>
          )}
        </div>
      </aside>
    </>
  );
};