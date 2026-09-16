import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge, LogoIcon } from '../../components/common';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileSpreadsheet,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  Save,
  CheckCircle2,
  Database,
  Lock,
  Bell,
  Globe,
  Sliders,
  Server,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoVerifyNID, setAutoVerifyNID] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);
  const [databaseEngine, setDatabaseEngine] = useState('postgresql');
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: <LayoutDashboard size={19} /> },
    { label: 'শ্রমিক ব্যবস্থাপনা', href: '/admin/workers', icon: <Users size={19} /> },
    { label: 'নিয়োগকর্তা তালিকা', href: '/admin/employers', icon: <Building2 size={19} /> },
    { label: 'কাজের সার্কুলার', href: '/jobs', icon: <Briefcase size={19} /> },
    { label: 'আবেদনপত্রসমূহ', href: '/admin/applications', icon: <FileSpreadsheet size={19} /> },
    { label: 'যাচাইকরণ কিউ', href: '/admin/workers', icon: <ShieldCheck size={19} /> },
    { label: 'রিপোর্ট ও অ্যানালিটিক্স', href: '/admin/reports', icon: <BarChart3 size={19} /> },
    { label: 'সিস্টেম সেটিংস', href: '/admin/settings', icon: <Settings size={19} />, active: true },
  ];

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/50 animate-bounce">
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold">সিস্টেম কনফিগারেশন সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0f172a] border-r border-slate-800 transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-2xl`}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg flex-shrink-0">
              <LogoIcon size={24} />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-lg text-white tracking-tight leading-tight">
                  শ্রমিক<span className="text-emerald-400">আইডি</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  অ্যাডমিন পোর্টাল
                </span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 custom-scrollbar">
          {sidebarItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.href)}
              className={`w-full px-3.5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200 group ${
                item.active
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 font-bold border border-emerald-500/30 shadow-lg shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title={item.label}
            >
              <span className={item.active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}>
                {item.icon}
              </span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-[#0a0f1d]">
          <button
            onClick={handleLogout}
            className={`w-full py-2.5 px-3 rounded-xl border border-slate-700/60 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all flex items-center gap-2 text-xs font-bold ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut size={16} />
            {sidebarOpen && <span>লগআউট</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Header */}
        <header className="bg-[#0f172a]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors border border-slate-800"
            >
              <Settings size={18} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">সিস্টেম ও অবকাঠামো সেটিংস</h1>
              <p className="text-xs text-slate-400 hidden sm:block">ডাটাবেজ কনফিগারেশন, এপিআই পলিসি ও ভেরিফিকেশন রুলস</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Save size={14} />
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-6 lg:p-8 space-y-6 custom-scrollbar max-w-5xl">
          {/* Section 1: Verification Engine */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>জাতীয় ভেরিফিকেশন ইঞ্জিন কনফিগারেশন</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">এনআইডি ডাটাবেজ অটো-ভ্যালিডেশন</h4>
                  <p className="text-xs text-slate-400 mt-0.5">রেজিস্ট্রেশনের সময় জাতীয় নির্বাচন কমিশন এপিআই-র সাথে নামের বানান ও জন্মতারিখ মিল যাচাই।</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoVerifyNID}
                  onChange={(e) => setAutoVerifyNID(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">এসএমএস ওটিপি ও নোটিফিকেশন গেটওয়ে</h4>
                  <p className="text-xs text-slate-400 mt-0.5">লগইন, পাসওয়ার্ড পুনরুদ্ধার এবং নতুন নিয়োগ অফারে শ্রমিককে তাৎক্ষণিক বাংলা এসএমএস পাঠানো।</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotification}
                  onChange={(e) => setSmsNotification(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Database & Security Engine */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Database size={16} />
              <span>ডাটাবেজ ও নিরাপত্তা পলিসি</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">সক্রিয় ডাটাবেজ ড্রাইভার</label>
                <select
                  value={databaseEngine}
                  onChange={(e) => setDatabaseEngine(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                >
                  <option value="postgresql">PostgreSQL 16 (প্রোডাকশন অপ্টিমাইজড)</option>
                  <option value="sqlite">SQLite (লোকাল ডেমো ডেভেলপমেন্ট)</option>
                </select>
                <span className="text-[11px] text-emerald-400 font-semibold block">কানেকশন পুল: অ্যাক্টিভ ও সুস্থ</span>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">এপিআই রেট লিমিট প্রটেকশন</label>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">প্রতি মিনিটে সর্বোচ্চ ৬০ টি রিকোয়েস্ট</span>
                  <input
                    type="checkbox"
                    checked={rateLimitEnabled}
                    onChange={(e) => setRateLimitEnabled(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
