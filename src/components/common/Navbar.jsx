import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, ShieldCheck, Briefcase, Search } from 'lucide-react';
import Button from './Button';
import Logo from './Logo';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'হোম', href: '/' },
    { label: 'চাকরি খুঁজুন', href: '/jobs' },
    { label: 'কীভাবে কাজ করে', href: '/how-it-works' },
    { label: 'আমাদের সম্পর্কে', href: '/about' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'worker') return '/worker/dashboard';
    if (user.role === 'employer') return '/employer/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/login';
  };

  const getRoleBadgeBangla = () => {
    if (!user) return '';
    if (user.role === 'worker') return 'শ্রমিক';
    if (user.role === 'employer') return 'নিয়োগকর্তা';
    if (user.role === 'admin') return 'অ্যাডমিন';
    return '';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo />

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 text-sm font-semibold transition-colors"
                >
                  <LayoutDashboard size={16} className="text-emerald-600" />
                  <span>ড্যাশবোর্ড</span>
                  <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-medium">
                    {getRoleBadgeBangla()}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="লগআউট"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="md" className="font-semibold text-slate-700 hover:text-emerald-600">
                    লগইন
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="md"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all"
                  >
                    নিবন্ধন করুন
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-semibold"
                  >
                    <LayoutDashboard size={18} />
                    <span>ড্যাশবোর্ডে যান ({getRoleBadgeBangla()})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-2.5 text-red-600 font-semibold hover:bg-red-50 rounded-xl"
                  >
                    <LogOut size={18} />
                    <span>লগআউট</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth className="rounded-xl">
                      লগইন
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button fullWidth className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                      নিবন্ধন
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
