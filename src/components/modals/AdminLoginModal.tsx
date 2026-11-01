import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { NaviraLogo } from '../NaviraLogo';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  getAuthorizedAdminEmails 
} from '../../utils/auth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type AuthTab = 'google' | 'email';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<AuthTab>('google');
  
  // Form states
  const [googleEmail, setGoogleEmail] = useState('navirabusiness01@gmail.com');
  const [email, setEmail] = useState('navirabusiness01@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const authorizedEmails = getAuthorizedAdminEmails();

  // 1. Handle Google Sign-In (OAuth / Gmail)
  const handleGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginWithGoogle(
        googleEmail,
        'NAVIRA Business Admin',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      );

      if (result.success) {
        setSuccessMsg(`Welcome! Signed in as ${googleEmail}`);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 800);
      } else {
        setError(result.error || 'Google authentication rejected.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to authenticate via Google OAuth.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Email & Password Login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginWithEmail(email, password);
      if (result.success) {
        setSuccessMsg(`Authenticated successfully as ${email}`);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 800);
      } else {
        setError(result.error || 'Invalid credentials or unauthorized role.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login attempt failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#09152A] border border-[#19BDF0]/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <NaviraLogo size="lg" className="justify-center mb-3" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            NAVIRA Administrator Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Authenticate to manage private leads, manage projects, and export analytics.
          </p>
        </div>

        {/* Clean 2-Option Auth Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#030712] rounded-xl border border-white/5 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('google'); setError(null); }}
            className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'google'
                ? 'bg-gradient-to-r from-[#19BDF0] to-[#10B981] text-slate-950 font-bold shadow-md shadow-[#19BDF0]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill={activeTab === 'google' ? '#02050D' : '#4285F4'}
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill={activeTab === 'google' ? '#02050D' : '#34A853'}
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill={activeTab === 'google' ? '#02050D' : '#FBBC05'}
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill={activeTab === 'google' ? '#02050D' : '#EA4335'}
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Sign-In</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('email'); setError(null); }}
            className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'email'
                ? 'bg-gradient-to-r from-[#19BDF0] to-[#10B981] text-slate-950 font-bold shadow-md shadow-[#19BDF0]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>Email & Password</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* OPTION 1: GOOGLE OAUTH / GMAIL SIGN-IN */}
        {activeTab === 'google' && (
          <form onSubmit={handleGoogleSignIn} className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#030712] border border-white/5 space-y-2">
              <label className="block text-slate-300 font-semibold text-[11px]">
                Authorized Google / Gmail Account
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#07172C] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                />
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Role-Based Access Control (RBAC) enforced. Only registered administrator accounts on the NAVIRA whitelist will be granted access.
              </p>
            </div>

            {/* Official Google OAuth Button */}
            <button
              type="submit"
              disabled={loading || !googleEmail.trim()}
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-100 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-lg shadow-white/5 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Authenticating with Google...' : 'Continue with Google'}</span>
            </button>
          </form>
        )}

        {/* OPTION 2: EMAIL & PASSWORD LOGIN */}
        {activeTab === 'email' && (
          <form onSubmit={handleEmailSignIn} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="navirabusiness01@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your administrator password..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-lg shadow-[#19BDF0]/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>{loading ? 'Validating Session...' : 'Sign In with Email & JWT'}</span>
            </button>
          </form>
        )}

        {/* Whitelist and RBAC Information Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authorized Admin:</span>
            </span>
            <span className="text-white font-mono text-[11px]">navirabusiness01@gmail.com</span>
          </div>
          <p className="text-[10px] text-slate-500 text-center">
            Secured with SHA-256 session encryption and Role-Based Access Control.
          </p>
        </div>

      </div>
    </div>
  );
};
