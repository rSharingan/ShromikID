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
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  FileText,
  PieChart,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toBengaliNumber } from '../../utils/formatters';

const AdminReportsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reportType, setReportType] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleExport = (format) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToastMessage(`জাতীয় স্কিল পাসপোর্ট ডাটাবেজ রিপোর্ট (${format.toUpperCase()}) সফলভাবে ডাউনলোড হয়েছে!`);
      setTimeout(() => setToastMessage(''), 4000);
    }, 1000);
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
    { label: 'রিপোর্ট ও অ্যানালিটিক্স', href: '/admin/reports', icon: <BarChart3 size={19} />, active: true },
    { label: 'সিস্টেম সেটিংস', href: '/admin/settings', icon: <Settings size={19} /> },
  ];

  const reportItems = [
    {
      title: 'জাতীয় শ্রমিক স্কিল পাসপোর্ট ডাটাবেজ রিপোর্ট (২০২৬)',
      description: 'সারাদেশের সকল নিবন্ধিত ও এনআইডি ভেরিফাইড শ্রমিকের বিস্তারিত কারিগরি দক্ষতা তালিকা।',
      date: '১৭ সেপ্টেম্বর ২০২৬',
      size: '৪.২ MB',
      records: '১২,৮৫০ জন শ্রমিক',
      category: 'শ্রমিক তথ্য',
    },
    {
      title: 'নিয়োগকর্তা ও সার্কুলার কর্মসংস্থান পরিসংখ্যান',
      description: 'বাণিজ্যিক ও বেসরকারি প্রতিষ্ঠানসমূহের চাকরির সার্কুলার ও সফল কর্মী নিয়োগের মাসিক ডাটা।',
      date: '১৫ সেপ্টেম্বর ২০২৬',
      size: '২.১ MB',
      records: '৩৪২ টি সার্কুলার',
      category: 'কর্মসংস্থান',
    },
    {
      title: 'এনআইডি ও পুলিশ ভেরিফিকেশন অডিট ট্রেল',
      description: 'জাতীয় ডাটাবেজ যাচাইকরণ, বায়োমেট্রিক ও সার্টিফিকেট অথেনটিকেশন লগ রিপোর্ট।',
      date: '১২ সেপ্টেম্বর ২০২৬',
      size: '১.৮ MB',
      records: '১১,৯২০ ভেরিফাইড রেকর্ড',
      category: 'নিরাপত্তা ও অডিট',
    },
    {
      title: 'মজুরি ও আর্থিক বাজার বিশ্লেষণ রিপোর্ট',
      description: 'দৈনিক ও মাসিক ভিত্তির বাজার মজুরি রেট ও বিভাগীয় চাহিদা চার্ট।',
      date: '১০ সেপ্টেম্বর ২০২৬',
      size: '৩.৫ MB',
      records: '৬৪ টি জেলা',
      category: 'মজুরি গবেষণা',
    },
  ];

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/50 animate-bounce">
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold">{toastMessage}</span>
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
              <BarChart3 size={18} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">রিপোর্ট ও জাতীয় পরিসংখ্যান কেন্দ্র</h1>
              <p className="text-xs text-slate-400 hidden sm:block">অফিসিয়াল ডাটা এক্সপোর্ট, অডিট ট্রেল ও কর্মসংস্থান অ্যানালিটিক্স</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Download size={14} />
              <span>{isExporting ? 'প্রসেসিং...' : 'পিডিএফ ডাউনলোড'}</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-6 lg:p-8 space-y-6 custom-scrollbar">
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">মোট ডাটাবেজ রেকর্ড</p>
              <p className="text-3xl font-black text-white">১৪,৪৩০ টি</p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
                <TrendingUp size={14} /> ১০০% এনক্রিপ্টেড অডিট লগ
              </p>
            </div>

            <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">মাসিক ডাউনলোড সংখ্যা</p>
              <p className="text-3xl font-black text-white">৫৮০+ বার</p>
              <p className="text-xs text-blue-400 mt-2 font-semibold">মন্ত্রণালয় ও প্রাতিষ্ঠানিক রিপোর্ট</p>
            </div>

            <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ডাটা ভ্যালিডেশন স্ট্যাটাস</p>
              <p className="text-3xl font-black text-emerald-400">১০০% উত্তীর্ণ</p>
              <p className="text-xs text-slate-400 mt-2 font-semibold">বিটিইবি ও এনএসডিএ স্ট্যান্ডার্ড</p>
            </div>
          </div>

          {/* Available Reports List */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white">ডাউনলোডযোগ্য অফিশিয়াল রিপোর্টসমূহ</h3>
              <span className="text-xs text-slate-400">সর্বশেষ আপডেট: আজ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl space-y-3 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{item.records} • {item.size}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleExport('csv')}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all border border-slate-700 text-xs"
                      >
                        CSV
                      </button>
                      <button
                        onClick={() => handleExport('pdf')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-md text-xs flex items-center gap-1"
                      >
                        <Download size={12} />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReportsPage;
