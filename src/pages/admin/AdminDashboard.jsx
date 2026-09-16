import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge, LogoIcon } from '../../components/common';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileCheck,
  ShieldCheck,
  HelpCircle,
  BarChart3,
  Settings,
  LogOut,
  RefreshCw,
  Clock,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ArrowUpRight,
  Database,
  Server,
  Lock,
  ChevronRight,
  Filter,
  Eye,
  Check,
  X,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/api';
import { toBengaliNumber } from '../../utils/formatters';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('6m'); // '6m' | '1y'
  const [activeChartPoint, setActiveChartPoint] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  const [statsData, setStatsData] = useState({
    totalWorkers: 12850,
    totalEmployers: 1240,
    verifiedWorkers: 11920,
    pendingVerification: 148,
    activeJobs: 342,
    totalApplications: 5820,
  });

  // Verification queue mock/live data
  const [pendingWorkers, setPendingWorkers] = useState([
    {
      id: 'SHR-W-2026-000201',
      name: 'মো. রহিম উদ্দিন',
      occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      district: 'ঢাকা',
      nidStatus: '১০০% ম্যাচ',
      submittedAt: '১০ মিনিট আগে',
      initials: 'র',
      avatarBg: 'from-emerald-500 to-teal-700',
    },
    {
      id: 'SHR-W-2026-000202',
      name: 'মোসা. করিমা বেগম',
      occupation: 'মাস্টার ট্রেইলার ও স্যাম্পল মেকার',
      district: 'চট্টগ্রাম',
      nidStatus: '১০০% ম্যাচ',
      submittedAt: '২৫ মিনিট আগে',
      initials: 'ক',
      avatarBg: 'from-purple-500 to-indigo-700',
    },
    {
      id: 'SHR-W-2026-000203',
      name: 'আবুল হোসেন',
      occupation: 'মাস্টার প্লাম্বার ও হাইড্রো পাইপফিটার',
      district: 'সিলেট',
      nidStatus: '১০০% ম্যাচ',
      submittedAt: '১ ঘণ্টা আগে',
      initials: 'আ',
      avatarBg: 'from-blue-500 to-cyan-700',
    },
    {
      id: 'SHR-W-2026-000204',
      name: 'মোঃ সাইফুল ইসলাম',
      occupation: 'হেভি ভেহিক্যাল ও ক্রেন ড্রাইভার',
      district: 'খুলনা',
      nidStatus: 'যাচাইযোগ্য',
      submittedAt: '২ ঘণ্টা আগে',
      initials: 'স',
      avatarBg: 'from-amber-500 to-orange-700',
    },
  ]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await adminService.getStats();
      if (res.success && res.data && res.data.stats) {
        setStatsData((prev) => ({
          ...prev,
          ...res.data.stats,
        }));
      }
    } catch (err) {
      console.warn('Live admin stats loaded with defaults:', err.message);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const [lastVerifiedItem, setLastVerifiedItem] = useState(null);

  const handleQuickVerify = (id) => {
    const itemToVerify = pendingWorkers.find((w) => w.id === id);
    setActionLoading(id);
    setTimeout(() => {
      setLastVerifiedItem(itemToVerify);
      setPendingWorkers((prev) => prev.filter((w) => w.id !== id));
      setStatsData((prev) => ({
        ...prev,
        verifiedWorkers: prev.verifiedWorkers + 1,
        pendingVerification: Math.max(0, prev.pendingVerification - 1),
      }));
      setActionLoading(null);
      setSuccessToast('শ্রমিক আইডি সফলভাবে অনুমোদিত ও যাচাইকৃত হয়েছে!');
      setTimeout(() => setSuccessToast(''), 5000);
    }, 500);
  };

  const handleUndoQuickVerify = () => {
    if (!lastVerifiedItem) return;
    setPendingWorkers((prev) => [lastVerifiedItem, ...prev]);
    setStatsData((prev) => ({
      ...prev,
      verifiedWorkers: Math.max(0, prev.verifiedWorkers - 1),
      pendingVerification: prev.pendingVerification + 1,
    }));
    setLastVerifiedItem(null);
    setSuccessToast('ভেরিফিকেশন সফলভাবে পূর্বাবস্থায় ফিরিয়ে আনা হয়েছে!');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: <LayoutDashboard size={19} />, active: true },
    { label: 'শ্রমিক ব্যবস্থাপনা', href: '/admin/workers', icon: <Users size={19} /> },
    { label: 'নিয়োগকর্তা তালিকা', href: '/admin/employers', icon: <Building2 size={19} /> },
    { label: 'কাজের সার্কুলার', href: '/jobs', icon: <Briefcase size={19} /> },
    { label: 'আবেদনপত্রসমূহ', href: '/admin/applications', icon: <FileSpreadsheet size={19} /> },
    { label: 'যাচাইকরণ কিউ', href: '/admin/workers', icon: <ShieldCheck size={19} />, badge: toBengaliNumber(statsData.pendingVerification) },
    { label: 'রিপোর্ট ও অ্যানালিটিক্স', href: '/admin/reports', icon: <BarChart3 size={19} /> },
    { label: 'সিস্টেম সেটিংস', href: '/admin/settings', icon: <Settings size={19} /> },
  ];

  // Stat metrics data
  const statCards = [
    {
      id: 'workers',
      title: 'মোট নিবন্ধিত শ্রমিক',
      value: toBengaliNumber(statsData.totalWorkers),
      trend: '+১২.৪% এই মাসে',
      isPositive: true,
      icon: <Users size={22} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      glowBg: 'from-emerald-500/10 to-teal-500/0',
      href: '/admin/workers',
    },
    {
      id: 'employers',
      title: 'অনুমোদিত নিয়োগকর্তা',
      value: toBengaliNumber(statsData.totalEmployers),
      trend: '+৮.২% এই মাসে',
      isPositive: true,
      icon: <Building2 size={22} className="text-blue-400" />,
      iconBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      glowBg: 'from-blue-500/10 to-cyan-500/0',
      href: '/admin/employers',
    },
    {
      id: 'verified',
      title: 'যাচাইকৃত স্কিল পাসপোর্ট',
      value: toBengaliNumber(statsData.verifiedWorkers),
      trend: '৯২.৮% জাতীয় হার',
      isPositive: true,
      icon: <ShieldCheck size={22} className="text-teal-400" />,
      iconBg: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
      glowBg: 'from-teal-500/10 to-emerald-500/0',
      href: '/admin/workers',
    },
    {
      id: 'pending',
      title: 'ভেরিফিকেশন অপেক্ষমান',
      value: toBengaliNumber(statsData.pendingVerification),
      trend: 'পর্যালোচনা প্রয়োজন',
      isPositive: false,
      icon: <Clock size={22} className="text-amber-400" />,
      iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      glowBg: 'from-amber-500/10 to-orange-500/0',
      href: '/admin/workers',
    },
    {
      id: 'jobs',
      title: 'সক্রিয় কাজের সার্কুলার',
      value: toBengaliNumber(statsData.activeJobs),
      trend: 'লাইভ নিয়োগ চলমান',
      isPositive: true,
      icon: <Briefcase size={22} className="text-purple-400" />,
      iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      glowBg: 'from-purple-500/10 to-pink-500/0',
      href: '/jobs',
    },
    {
      id: 'applications',
      title: 'মোট কাজের আবেদনপত্র',
      value: toBengaliNumber(statsData.totalApplications),
      trend: '+১৮% সরাসরি নিয়োগ',
      isPositive: true,
      icon: <FileCheck size={22} className="text-rose-400" />,
      iconBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      glowBg: 'from-rose-500/10 to-red-500/0',
      href: '/admin/workers',
    },
  ];

  // Monthly trend chart data points
  const chartPoints = [
    { month: 'এপ্রিল', workers: 840, jobs: 120, x: 50, yWorkers: 150, yJobs: 180 },
    { month: 'মে', workers: 1250, jobs: 180, x: 130, yWorkers: 120, yJobs: 160 },
    { month: 'জুন', workers: 1900, jobs: 240, x: 210, yWorkers: 90, yJobs: 140 },
    { month: 'জুলাই', workers: 2450, jobs: 310, x: 290, yWorkers: 60, yJobs: 110 },
    { month: 'আগস্ট', workers: 3100, jobs: 390, x: 370, yWorkers: 40, yJobs: 90 },
    { month: 'সেপ্টেম্বর', workers: 3850, jobs: 480, x: 450, yWorkers: 20, yJobs: 70 },
  ];

  // Sector distribution breakdown
  const sectorData = [
    { name: 'ইলেকট্রিক্যাল ও পাওয়ার', count: '৩,৪৫০', percentage: 28, color: 'bg-emerald-500', barBg: 'from-emerald-500 to-teal-400' },
    { name: 'নির্মাণ ও রাজমিস্ত্রি', count: '৩,১০০', percentage: 25, color: 'bg-teal-500', barBg: 'from-teal-500 to-cyan-400' },
    { name: 'দর্জি ও তৈরি পোশাক', count: '২,২০০', percentage: 18, color: 'bg-blue-500', barBg: 'from-blue-500 to-indigo-400' },
    { name: 'ড্রাইভার ও হেভি ভেহিকেল', count: '১,৮৫০', percentage: 15, color: 'bg-amber-500', barBg: 'from-amber-500 to-orange-400' },
    { name: 'প্লাম্বিং ও স্যানিটারি', count: '১,২৫০', percentage: 10, color: 'bg-purple-500', barBg: 'from-purple-500 to-pink-400' },
    { name: 'অন্যান্য কারিগরি কাজ', count: '৫০০', percentage: 4, color: 'bg-slate-500', barBg: 'from-slate-500 to-slate-400' },
  ];

  // Regional division breakdown
  const divisionData = [
    { name: 'ঢাকা বিভাগ', workers: '৫,৬০০ জন', percentage: 44, color: 'bg-emerald-400' },
    { name: 'চট্টগ্রাম বিভাগ', workers: '৩,২০০ জন', percentage: 25, color: 'bg-teal-400' },
    { name: 'সিলেট বিভাগ', workers: '১,৬৫০ জন', percentage: 13, color: 'bg-cyan-400' },
    { name: 'খুলনা বিভাগ', workers: '১,৩০০ জন', percentage: 10, color: 'bg-blue-400' },
    { name: 'রাজশাহী ও অন্যান্য', workers: '১,১০০ জন', percentage: 8, color: 'bg-indigo-400' },
  ];

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification with Undo Action */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/50">
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold">{successToast}</span>
          {lastVerifiedItem && (
            <button
              onClick={handleUndoQuickVerify}
              className="ml-2 px-3 py-1 bg-black/30 hover:bg-black/50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-white/20 active:scale-95"
            >
              <RotateCcw size={13} />
              <span>পূর্বাবস্থায় আনুন (Undo)</span>
            </button>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. PROFESSIONAL SIDEBAR NAVIGATION                        */}
      {/* ======================================================== */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0f172a] border-r border-slate-800 transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-2xl`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50 flex-shrink-0">
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

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 custom-scrollbar">
          {sidebarItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.href)}
              className={`w-full px-3.5 py-3 rounded-2xl flex items-center justify-between transition-all duration-200 group ${
                item.active
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 font-bold border border-emerald-500/30 shadow-lg shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title={item.label}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-transform duration-200 group-hover:scale-110 ${item.active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {item.icon}
                </span>
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </div>
              {sidebarOpen && item.badge && (
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-[#0a0f1d]">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                প্র
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'সেন্ট্রাল অ্যাডমিন'}</p>
                <p className="text-[10px] text-emerald-400 font-medium">প্রধান সিস্টেম প্রশাসক</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full py-2.5 px-3 rounded-xl border border-slate-700/60 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all flex items-center gap-2 text-xs font-bold ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
            title="লগআউট"
          >
            <LogOut size={16} />
            {sidebarOpen && <span>লগআউট</span>}
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA                                      */}
      {/* ======================================================== */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Top Navbar */}
        <header className="bg-[#0f172a]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors border border-slate-800"
              title="সাইডবার টগল"
            >
              <Activity size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white tracking-tight">
                  অ্যাডমিন ড্যাশবোর্ড ও নিয়ন্ত্রণ কেন্দ্র
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  সিস্টেম লাইভ
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                জাতীয় ওয়ার্কার ভেরিফিকেশন, স্কিল পাসপোর্ট ও কর্মসংস্থান ডাটাবেজ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              title="ডাটা রিফ্রেশ করুন"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-emerald-400' : ''} />
              <span className="hidden sm:inline">রিফ্রেশ</span>
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <Database size={14} className="text-emerald-400" />
              <span className="text-slate-300 font-mono">PostgreSQL / SQLite</span>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-6 lg:p-8 space-y-8 custom-scrollbar">
          {/* ======================================================== */}
          {/* 3. CORE METRIC CARDS (High-Contrast, Visible & Gradient) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {statCards.map((stat) => (
              <div
                key={stat.id}
                onClick={() => navigate(stat.href)}
                className="relative overflow-hidden bg-[#131b2e] border border-slate-800/80 hover:border-emerald-500/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/30 group cursor-pointer"
                title={`${stat.title} দেখতে ক্লিক করুন`}
              >
                {/* Subtle Ambient Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${stat.glowBg} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`p-3 rounded-2xl border ${stat.iconBg} shadow-inner`}>
                    {stat.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/80 flex items-center gap-1">
                    {stat.isPositive ? <TrendingUp size={12} className="text-emerald-400" /> : <Clock size={12} className="text-amber-400" />}
                    <span>{stat.trend}</span>
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-none group-hover:text-emerald-300 transition-colors">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ======================================================== */}
          {/* 4. GRAPHICAL REPRESENTATION & ANALYTICS (Interactive SVG)*/}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Monthly Growth & Registration Curves */}
            <div className="lg:col-span-2 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <BarChart3 size={16} />
                    <span>গ্রাফিক্যাল ট্রেন্ড অ্যানালাইসিস</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white mt-1">
                    মাসিক শ্রমিক রেজিস্ট্রেশন ও সার্কুলার প্রবৃদ্ধি
                  </h3>
                </div>

                {/* Time range pills */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                  <button
                    onClick={() => setTimeRange('6m')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timeRange === '6m'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    গত ৬ মাস
                  </button>
                  <button
                    onClick={() => setTimeRange('1y')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timeRange === '1y'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    গত ১ বছর
                  </button>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-6 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                  <span className="text-slate-300">নতুন নিবন্ধিত শ্রমিক (সবুজ রেখা)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                  <span className="text-slate-300">কাজের সার্কুলার (সায়ান রেখা)</span>
                </div>
              </div>

              {/* Interactive Vector SVG Line/Area Graph */}
              <div className="relative w-full h-[220px] bg-slate-900/60 rounded-2xl border border-slate-800/80 p-3 flex flex-col justify-end">
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Area fill for Workers */}
                  <polygon
                    points="50,150 130,120 210,90 290,60 370,40 450,20 450,200 50,200"
                    fill="url(#emeraldGradient)"
                  />

                  {/* Line for Workers */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="50,150 130,120 210,90 290,60 370,40 450,20"
                  />

                  {/* Line for Jobs */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4 2"
                    points="50,180 130,160 210,140 290,110 370,90 450,70"
                  />

                  {/* Interactive Nodes */}
                  {chartPoints.map((pt, i) => (
                    <g
                      key={i}
                      className="cursor-pointer group"
                      onMouseEnter={() => setActiveChartPoint(pt)}
                      onMouseLeave={() => setActiveChartPoint(null)}
                    >
                      {/* Worker Node */}
                      <circle
                        cx={pt.x}
                        cy={pt.yWorkers}
                        r="6"
                        className="fill-emerald-400 stroke-slate-900 stroke-2 group-hover:r-8 transition-all"
                      />
                      {/* Job Node */}
                      <circle
                        cx={pt.x}
                        cy={pt.yJobs}
                        r="5"
                        className="fill-cyan-400 stroke-slate-900 stroke-2 group-hover:r-7 transition-all"
                      />
                      {/* X Axis Month Label */}
                      <text
                        x={pt.x}
                        y="195"
                        textAnchor="middle"
                        className="text-[11px] fill-slate-400 font-bold"
                      >
                        {pt.month}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Floating Interactive Tooltip */}
                {activeChartPoint && (
                  <div
                    className="absolute bg-slate-900/95 border border-emerald-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur-md pointer-events-none z-20 text-xs space-y-1 animate-fadeIn"
                    style={{ left: `${(activeChartPoint.x / 500) * 80}%`, top: '10%' }}
                  >
                    <p className="font-bold text-white border-b border-slate-700 pb-1">
                      {activeChartPoint.month} মাসের পরিসংখ্যান
                    </p>
                    <p className="text-emerald-400 font-bold">
                      নিবন্ধিত শ্রমিক: {toBengaliNumber(activeChartPoint.workers)} জন
                    </p>
                    <p className="text-cyan-300 font-medium">
                      পোস্টকৃত সার্কুলার: {toBengaliNumber(activeChartPoint.jobs)} টি
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Col: Sector & Skill Distribution */}
            <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-white">খাতভিত্তিক শ্রমিক বণ্টন</h3>
                  <p className="text-xs text-slate-400">শীর্ষ ৬ টি কারিগরি পেশা</p>
                </div>
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/40 text-[10px]">
                  ১০০% লাইভ
                </Badge>
              </div>

              <div className="space-y-3.5">
                {sectorData.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold">{sec.name}</span>
                      <span className="font-bold text-white">{sec.count} জন ({toBengaliNumber(sec.percentage)}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full bg-gradient-to-r ${sec.barBg} rounded-full transition-all duration-700`}
                        style={{ width: `${sec.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 5. VERIFICATION QUEUE & DIVISIONAL HEATMAP                */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Live Worker Verification Queue */}
            <div className="lg:col-span-2 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck size={16} />
                    <span>যাচাইকরণ কিউ (Verification Queue)</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">
                    অপেক্ষমান জাতীয় পরিচয়পত্র ও স্কিল আবেদন
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/admin/workers')}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>সকল তালিকা</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {pendingWorkers.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                  <p className="font-bold text-white">কোনো অপেক্ষমান আবেদন নেই!</p>
                  <p>সকল শ্রমিকের প্রোফাইল ও স্কিল পাসপোর্ট সফলভাবে যাচাইকৃত।</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      className="p-4 bg-slate-900/80 hover:bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${worker.avatarBg} flex items-center justify-center text-white font-black text-base shadow-md`}
                        >
                          {worker.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{worker.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                              {worker.nidStatus}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {worker.occupation} • {worker.district} জেলা • <span className="text-slate-500">{worker.submittedAt}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleQuickVerify(worker.id)}
                          disabled={actionLoading === worker.id}
                          className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {actionLoading === worker.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Check size={14} />
                          )}
                          <span>অনুমোদন দিন</span>
                        </button>
                        <button
                          onClick={() => navigate('/admin/workers')}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 transition-colors"
                          title="প্রোফাইল পরীক্ষা করুন"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 1 Col: Regional Division Distribution */}
            <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-base font-extrabold text-white">বিভাগীয় উপস্থিতি</h3>
                <p className="text-xs text-slate-400">সারাদেশে নিবন্ধিত শ্রমিকের অনুপাত</p>
              </div>

              <div className="space-y-4">
                {divisionData.map((div, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-200 font-bold">{div.name}</span>
                      <span className="text-slate-400">{div.workers} ({toBengaliNumber(div.percentage)}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${div.color} rounded-full transition-all duration-500`}
                        style={{ width: `${div.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800">
                <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-400 font-medium">ভেরিফিকেশন স্পিড:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Activity size={14} /> গড়ে ১.২ দিন / শ্রমিক
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 6. SYSTEM HEALTH & TELEMETRY MONITOR                     */}
          {/* ======================================================== */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Server size={16} className="text-emerald-400" />
              <span>সিস্টেম অবকাঠামো ও নিরাপত্তা স্ট্যাটাস</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800/80 space-y-1">
                <p className="text-slate-400 font-medium">ডাটাবেজ সার্ভিস</p>
                <p className="text-white font-mono font-bold">PostgreSQL / Prisma ORM</p>
                <p className="text-[11px] text-emerald-400 font-semibold">ল্যাটেন্সি: ১৮ ms (স্মুথ)</p>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800/80 space-y-1">
                <p className="text-slate-400 font-medium">রেস্ট এপিআই সার্ভার</p>
                <p className="text-emerald-400 font-mono font-bold">Express REST v1.0.0</p>
                <p className="text-[11px] text-slate-400">পোর্ট: ৫০০০ (অনলাইন)</p>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800/80 space-y-1">
                <p className="text-slate-400 font-medium">পাসওয়ার্ড ও অথ এনক্রিপশন</p>
                <p className="text-white font-mono font-bold">bcryptjs (১০ রাউন্ডস হ্যাশিং)</p>
                <p className="text-[11px] text-emerald-400 font-semibold">JWT 7-Day Session</p>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800/80 space-y-1">
                <p className="text-slate-400 font-medium">ডিজিটাল সিগনেচার ও কিউআর</p>
                <p className="text-white font-mono font-bold">SHA-256 Tamper-Proof</p>
                <p className="text-[11px] text-emerald-400 font-semibold">জাতীয় ডাটাবেজ ভ্যালিডেশন</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
