import React, { useState } from 'react';
import { X, Lock, CheckCircle2, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onLoginSuccess, targetCourse }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser = {
        id: 'usr_rwa_2026',
        fullName: 'Kezia Umutoni',
        email: 'kezia.umutoni@thehub.rw',
        username: 'kezia_u',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
        location: 'Kigali, Rwanda',
        learningStreak: 4,
        enrolledCourses: ['crs-web-fund', 'crs-excel-data']
      };
      localStorage.setItem('hub_user', JSON.stringify(demoUser));
      onLoginSuccess(demoUser);
      setLoading(false);
      onClose();
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: `usr_${Date.now()}`,
        fullName: email.split('@')[0],
        email,
        username: email.split('@')[0],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
        location: 'Kigali, Rwanda',
        learningStreak: 1,
        enrolledCourses: []
      };
      localStorage.setItem('hub_user', JSON.stringify(user));
      onLoginSuccess(user);
      setLoading(false);
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-200 border border-slate-300 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Futuristic top accent hairline */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-900 via-blue-600 to-red-600" />

        {/* Header */}
        <div className="p-6 border-b border-slate-300 bg-slate-100/90 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wider font-mono">
              <Lock className="w-3.5 h-3.5 text-red-600" />
              <span>Authentication Gate</span>
            </div>
            <h2 className="text-base font-extrabold text-blue-950 mt-1">
              {targetCourse ? `Enroll in ${targetCourse.title}` : 'Sign In to The Hub'}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Authenticate to save course progress, complete assessments, and verify skills.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Quick Demo Access Button */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/10 to-red-600/10 border border-blue-900/20 hover:border-blue-900/50 hover:bg-blue-900/15 text-left transition-all duration-200 group shadow-sm active:scale-98"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Demo User"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-700"
              />
              <div>
                <div className="text-xs font-bold text-blue-950 group-hover:text-blue-800 flex items-center gap-1.5">
                  <span>Continue as Kezia Umutoni</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-600/15 text-red-700 rounded-md font-bold">
                    Demo Learner
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 font-mono">Instant 1-Click Login (Kigali, Rwanda)</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-700 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-3 text-slate-500 text-xs font-mono">
            <div className="h-px bg-slate-300 flex-1" />
            <span>OR EMAIL</span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="learner@thehub.rw"
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-950/20 transition-all active:scale-98 mt-2"
            >
              {loading ? 'Authenticating...' : isRegister ? 'Create Learner Account' : 'Sign In & Continue'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-600 pt-1">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-800 hover:text-blue-950 font-semibold hover:underline"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
