import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Award,
  Flame,
  User,
  LogOut,
  Users,
  Briefcase,
  MapPin
} from 'lucide-react';

export const Navbar = ({ user, onOpenAuth, onLogout, lowBandwidth, onToggleLowBandwidth }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Pathways', path: '/learning-paths' },
    { label: 'Peers & Groups', path: '/peers' },
    { label: 'Youth View', path: '/youth' },
    { label: 'Challenges', path: '/challenges' },
    { label: 'Skill Passport', path: '/skill-passport' },
    { label: 'My Profile', path: '/profile' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-300 bg-slate-900/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand in Dark Blue with Red/Blue accent */}
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-700 to-red-600 flex items-center justify-center shadow-lg shadow-blue-900/40 text-white font-extrabold text-lg tracking-wider border border-blue-400/30">
              H
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  The Hub
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Data-Informed Skills Platform
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-white bg-blue-800/80 font-bold shadow-sm border border-blue-600/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Learning streak in red neon styling */}
              <div className="flex items-center gap-1 text-red-400 text-xs font-mono font-bold bg-red-950/40 px-2.5 py-1 rounded-xl border border-red-600/40 shadow-sm shadow-red-900/20">
                <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>{user.learningStreak || 4}d</span>
              </div>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <Link to="/profile" title="View & Edit Profile" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500 object-cover shadow-sm"
                  />
                  <span className="hidden xl:inline text-xs font-bold text-white max-w-[100px] truncate">{user.fullName}</span>
                </Link>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth()}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-900/30 transition-all border border-blue-500/40 active:scale-95"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
