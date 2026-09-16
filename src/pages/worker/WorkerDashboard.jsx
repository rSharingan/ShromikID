import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogoIcon } from '../../components/common';
import {
  LayoutDashboard,
  Award,
  Briefcase,
  User,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  Star,
  LogOut,
  Bell,
  ChevronRight,
  Download,
  QrCode,
  ShieldCheck,
  Building2,
  X,
  Phone,
  Mail,
  FileCheck,
  XCircle,
  Eye,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  Check,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toBengaliNumber, formatBengaliCurrency } from '../../utils/formatters';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'applications' | 'history'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [contactModalJob, setContactModalJob] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Sample or state-driven applications
  const [applications, setApplications] = useState([
    {
      id: 'app-101',
      jobId: 'cmu4ex300000ohb2o0elssn6p',
      title: 'কমার্শিয়াল টাওয়ারের জন্য সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      company: 'এবিসি কনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট',
      location: 'গুলশান এভিনিউ, ঢাকা',
      wage: '৳ ১,০০০ / দৈনিক',
      status: 'shortlisted', // 'shortlisted' | 'pending' | 'accepted' | 'rejected'
      appliedAt: '২ দিন আগে',
      interviewDate: '২০ সেপ্টেম্বর, সকাল ১০:০০ টা',
      contactPhone: '০১৭০০-১১২২৩৩',
    },
    {
      id: 'app-102',
      jobId: 'cmu4ex300000phb2o0elssn6q',
      title: 'এইচটি ও এলটি প্যানেল বোর্ড ওয়্যারিং স্পেশালিস্ট',
      company: 'মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ',
      location: 'মেঘনা ঘাট, নারায়ণগঞ্জ',
      wage: '৳ ৩০,০০০ / মাসিক',
      status: 'pending',
      appliedAt: '৪ দিন আগে',
      interviewDate: null,
      contactPhone: '০১৮০০-৪৪৫৫৬৬',
    },
    {
      id: 'app-103',
      jobId: 'cmu4ex300000qhb2o0elssn6r',
      title: 'সাবস্টেশন মেইনটেন্যান্স ও জেনারেটর অপারেটর',
      company: 'প্রিমিয়ার সিভিল ইঞ্জিনিয়ার্স লিঃ',
      location: 'মিরপুর-১০, ঢাকা',
      wage: '৳ ৯৫০ / দৈনিক',
      status: 'accepted',
      appliedAt: '১ সপ্তাহ আগে',
      interviewDate: 'অনুমোদন সম্পন্ন (যোগদানের তারিখ: ০১ অক্টোবর)',
      contactPhone: '০১৯০০-৭৭৮৮৯৯',
    },
  ]);

  // Notifications
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: 'ইন্টারভিউ কল - এবিসি কনস্ট্রাকশন',
      message: 'আপনার সিনিয়র ইলেকট্রিশিয়ান পদের আবেদনটি শর্টলিস্ট করা হয়েছে। ২০ সেপ্টেম্বর সকাল ১০টায় উপস্থিত থাকুন।',
      time: '২ ঘণ্টা আগে',
      unread: true,
    },
    {
      id: 2,
      title: 'এনআইডি ও স্কিল ভেরিফিকেশন সম্পন্ন',
      message: 'অভিনন্দন! আপনার জাতীয় স্কিল পাসপোর্ট ১০০% ভেরিফাইড হয়েছে।',
      time: '১ দিন আগে',
      unread: false,
    },
  ]);

  // Recommended Jobs
  const recommendedJobs = [
    {
      id: 'cmu4ex300000ohb2o0elssn6p',
      title: 'কমার্শিয়াল টাওয়ারের জন্য ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      company: 'এবিসি কনস্ট্রাকশন',
      location: 'গুলশান, ঢাকা',
      salary: '৳ ৯০০ - ৳ ১,২০০ / দৈনিক',
      category: 'ইলেকট্রিক্যাল',
    },
    {
      id: 'cmu4ex300000rhb2o0elssn6s',
      title: 'ফ্যাক্টরি ৩-ফেজ লাইন টেকনিশিয়ান',
      company: 'প্রাণ-আরএফএল গ্রুপ',
      location: 'টঙ্গী, গাজীপুর',
      salary: '৳ ২৫,০০০ - ৳ ৩২,০০০ / মাসিক',
      category: 'ইলেকট্রিক্যাল',
    },
  ];

  // Work History
  const workHistory = [
    {
      id: 1,
      company: 'এবিসি কনস্ট্রাকশন',
      role: 'প্রধান ইলেকট্রিক্যাল টেকনিশিয়ান',
      duration: 'মার্চ ২০২৩ - আগস্ট ২০২৪',
      rating: 5,
      review: 'অত্যন্ত দক্ষ এবং দায়িত্বশীল কর্মী। ৩-ফেজ লাইন ও প্যানেল বোর্ড স্থাপনে নিখুঁত কাজ উপহার দিয়েছেন।',
    },
    {
      id: 2,
      company: 'মেঘনা এগ্রো মিলস',
      role: 'সাবস্টেশন সহকারী',
      duration: 'জানুয়ারি ২০২২ - ফেব্রুয়ারি ২০২৩',
      rating: 5,
      review: 'সময়নিষ্ঠ ও সৎ কর্মী। ভবিষ্যতে যেকোনো রক্ষণাবেক্ষণের কাজে আমরা উনাকে প্রাধান্য দিব।',
    },
  ];

  const profile = user?.workerProfile || {};
  const userName = user?.name || 'মোঃ রহিম উদ্দিন';
  const occupation = profile.occupation || 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান';
  const location = profile.district ? `${profile.district}, ${profile.division || ''}` : 'মিরপুর, ঢাকা';
  const isVerified = user?.verificationStatus === 'verified';
  const nidNumber = user?.nidNumber || profile.nidNumber || '19922692019000123';
  const experienceYears = profile.experienceYears || 7;

  const handleCancelApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    setToastMessage('কাজের আবেদন সফলভাবে প্রত্যাহার করা হয়েছে!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarNavItems = [
    { id: 'overview', label: 'ড্যাশবোর্ড সারসংক্ষেপ', icon: <LayoutDashboard size={18} /> },
    { id: 'applications', label: 'আমার আবেদনসমূহ', icon: <Briefcase size={18} /> },
    { id: 'history', label: 'কাজের ইতিহাস ও রিভিউ', icon: <FileCheck size={18} /> },
    { id: 'passport', label: 'ডিজিটাল স্কিল পাসপোর্ট', icon: <Award size={18} />, external: '/worker/skill-passport' },
    { id: 'jobs', label: 'চাকরির সার্কুলার খুঁজুন', icon: <Search size={18} />, external: '/jobs' },
    { id: 'profile', label: 'আমার প্রোফাইল ও এনআইডি', icon: <User size={18} />, external: '/worker/profile' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-600 text-xs sm:text-sm font-bold">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. CLEAN WORKER SIDEBAR                                   */}
      {/* ======================================================== */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-sm`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-700/20 flex-shrink-0">
              <LogoIcon size={24} />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-slate-900 tracking-tight leading-tight">
                  শ্রমিক<span className="text-emerald-600">আইডি</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  শ্রমিক ড্যাশবোর্ড
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Worker Mini Profile in Sidebar */}
        {sidebarOpen && (
          <div className="p-4 mx-3 my-2 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
            <p className="font-bold text-slate-900 text-xs truncate">{userName}</p>
            <p className="text-[11px] text-emerald-800 font-medium truncate mt-0.5">{occupation}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-900 font-bold bg-emerald-200/70 px-2 py-0.5 rounded-md w-fit">
              <ShieldCheck size={12} />
              <span>যাচাইকৃত শ্রমিক</span>
            </div>
          </div>
        )}

        {/* Sidebar Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 custom-scrollbar">
          {sidebarNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.external) {
                    navigate(item.external);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 transition-all text-xs font-bold ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={item.label}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500'}>
                  {item.icon}
                </span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className={`w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2 text-xs font-bold ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut size={16} />
            {sidebarOpen && <span>লগআউট</span>}
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA                                     */}
      {/* ======================================================== */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Clean Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors border border-slate-200"
            >
              <LayoutDashboard size={18} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {activeTab === 'overview' && 'শ্রমিক সেবা ও কাজের ড্যাশবোর্ড'}
                {activeTab === 'applications' && 'আমার সক্রিয় কাজের আবেদনসমূহ'}
                {activeTab === 'history' && 'কাজের পূর্ববর্তী ইতিহাস ও ক্লায়েন্ট রিভিউ'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                ডিজিটাল পরিচয়পত্র, স্কিল ভেরিফিকেশন ও চাকরির আবেদন ব্যবস্থাপনা
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick QR ID Card Button */}
            <button
              onClick={() => setShowIdCardModal(true)}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <QrCode size={16} className="text-emerald-700" />
              <span className="hidden sm:inline">ডিজিটাল আইডি কার্ড</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-colors relative"
                title="বিজ্ঞপ্তি"
              >
                <Bell size={18} />
                {notificationsList.some((n) => n.unread) && (
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full absolute top-1.5 right-1.5 border-2 border-white" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">বিজ্ঞপ্তিসমূহ</span>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {notificationsList.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-xl border text-xs space-y-1 ${
                          notif.unread
                            ? 'bg-emerald-50/80 border-emerald-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="font-bold text-slate-900">{notif.title}</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{notif.message}</p>
                        <span className="text-[10px] text-slate-400 block pt-1">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-5 sm:p-7 space-y-6 custom-scrollbar">
          {/* -------------------------------------------------------- */}
          {/* TAB 1: OVERVIEW                                          */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-700/20">
                    {userName.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">{userName}</h2>
                      <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                        <ShieldCheck size={13} className="text-emerald-700" /> এনআইডি সত্যায়িত
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                      {occupation} • {location} • অভিজ্ঞতা: {toBengaliNumber(experienceYears)} বছর
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      শ্রমিক আইডি নম্বর: <strong className="text-slate-700">{user?.id || 'SHR-W-2026-000201'}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => setShowIdCardModal(true)}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <QrCode size={16} />
                    <span>আইডি কার্ড প্রিন্ট / ভিউ</span>
                  </button>
                  <Link
                    to="/jobs"
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-300"
                  >
                    <Search size={16} />
                    <span>নতুন কাজ খুঁজুন</span>
                  </Link>
                </div>
              </div>

              {/* 4 Clean Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('applications')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">মোট কাজের আবেদন</span>
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <Briefcase size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{toBengaliNumber(applications.length)} টি</p>
                  <p className="text-[11px] text-slate-400 mt-1">সক্রিয় প্রক্রিয়াকরণ</p>
                </div>

                <div
                  onClick={() => setActiveTab('applications')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">শর্টলিস্টেড ও ডাক</span>
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <CheckCircle2 size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-emerald-700">
                    {toBengaliNumber(applications.filter((a) => a.status === 'shortlisted' || a.status === 'accepted').length)} টি
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-1">সাক্ষাৎকারের আমন্ত্রণ</p>
                </div>

                <div
                  onClick={() => setActiveTab('history')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">সম্পন্ন কন্ট্রাক্ট</span>
                    <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                      <FileCheck size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{toBengaliNumber(12)} টি</p>
                  <p className="text-[11px] text-slate-400 mt-1">১০০% সফল ডেলিভারি</p>
                </div>

                <div
                  onClick={() => navigate('/worker/skill-passport')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">স্কিল রেটিং</span>
                    <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <Star size={16} />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-2xl font-black text-slate-900">
                    <span>৪.৯</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">২৮ টি ক্লায়েন্ট রিভিউ</p>
                </div>
              </div>

              {/* Active Applications Section */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">আপনার সাম্প্রতিক চাকরির আবেদন ট্র্যাকিং</h3>
                    <p className="text-xs text-slate-500">নিয়োগকর্তাদের মূল্যায়ন ও ইন্টারভিউ অবস্থা</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>সকল আবেদন ({toBengaliNumber(applications.length)})</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {applications.slice(0, 2).map((app) => (
                    <div
                      key={app.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{app.title}</h4>
                          {app.status === 'shortlisted' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                              শর্টলিস্টেড
                            </span>
                          )}
                          {app.status === 'pending' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px] border border-amber-200">
                              পর্যালোচনাধীন
                            </span>
                          )}
                          {app.status === 'accepted' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] border border-blue-200">
                              অনুমোদিত
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 flex items-center gap-2">
                          <Building2 size={13} className="text-slate-400" />
                          <span>{app.company}</span>
                          <span>•</span>
                          <MapPin size={13} className="text-slate-400" />
                          <span>{app.location}</span>
                        </p>
                        {app.interviewDate && (
                          <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 pt-1">
                            <Clock size={13} />
                            <span>ইন্টারভিউ / রিপোর্ট সময়: {app.interviewDate}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                          onClick={() => setContactModalJob(app)}
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all"
                        >
                          কোম্পানি যোগাযোগ
                        </button>
                        <button
                          onClick={() => handleCancelApplication(app.id)}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                          title="আবেদন প্রত্যাহার করুন"
                        >
                          প্রত্যাহার
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Jobs Grid */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">আপনার দক্ষতার সাথে মানানসই নতুন সার্কুলার</h3>
                    <p className="text-xs text-slate-500">সরাসরি ১-ক্লিক ভেরিফাইড আবেদন</p>
                  </div>
                  <Link
                    to="/jobs"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>সকল সার্কুলার দেখুন</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all space-y-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          {job.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{job.title}</h4>
                        <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                        <span className="font-bold text-emerald-700">{job.salary}</span>
                        <button
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
                        >
                          আবেদন করুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 2: ALL APPLICATIONS                                  */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'applications' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">সকল চাকরির আবেদনপত্র</h3>
                  <p className="text-xs text-slate-500">আপনার জমা দেওয়া সমস্ত নিয়োগ আবেদনের লাইভ অবস্থা</p>
                </div>
                <Link
                  to="/jobs"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Search size={14} />
                  <span>নতুন কাজ খুঁজুন</span>
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <Briefcase size={36} className="mx-auto text-slate-300" />
                  <p className="font-bold text-slate-700 text-sm">কোনো সক্রিয় আবেদন নেই</p>
                  <p className="text-xs text-slate-500">সার্কুলার তালিকা থেকে আপনার পছন্দের কাজে এখনই আবেদন করুন।</p>
                  <Link to="/jobs">
                    <button className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">
                      সার্কুলার দেখুন
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-base">{app.title}</h4>
                          {app.status === 'shortlisted' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                              শর্টলিস্টেড
                            </span>
                          )}
                          {app.status === 'pending' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200">
                              পর্যালোচনাধীন
                            </span>
                          )}
                          {app.status === 'accepted' && (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200">
                              অনুমোদিত
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 flex items-center gap-3">
                          <span className="font-semibold text-slate-900">{app.company}</span>
                          <span>•</span>
                          <span>{app.location}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">মজুরি: {app.wage}</span>
                        </p>
                        {app.interviewDate && (
                          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2 mt-2">
                            <Clock size={14} className="text-emerald-700 flex-shrink-0" />
                            <span>ইন্টারভিউ / সাক্ষাৎকারের নোটিশ: {app.interviewDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                          onClick={() => setContactModalJob(app)}
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all"
                        >
                          যোগাযোগ
                        </button>
                        <button
                          onClick={() => handleCancelApplication(app.id)}
                          className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                        >
                          বাতিল করুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 3: WORK HISTORY & REVIEWS                            */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'history' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">কাজের পূর্ববর্তী চুক্তি ও সত্যায়িত রিভিউ</h3>
                <p className="text-xs text-slate-500">আপনার সম্পন্নকৃত প্রকল্প ও ক্লায়েন্ট ফিডব্যাক</p>
              </div>

              <div className="space-y-4">
                {workHistory.map((item) => (
                  <div key={item.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.company}</h4>
                        <p className="text-xs text-slate-500">{item.role} • {item.duration}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80 leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* 3. DIGITAL WORKER QR ID CARD MODAL                       */}
      {/* ======================================================== */}
      {showIdCardModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span>অফিসিয়াল ডিজিটাল শ্রমিক আইডি</span>
              </div>
              <button
                onClick={() => setShowIdCardModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Visual ID Card Preview */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 block">
                    গণপ্রজাতন্ত্রী বাংলাদেশ অনুমোদিত
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight">শ্রমিক আইডি কার্ড</h3>
                </div>
                <div className="w-8 h-8 bg-emerald-700/80 rounded-lg flex items-center justify-center text-white border border-emerald-500/40">
                  <LogoIcon size={18} />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="w-16 h-16 rounded-xl bg-white text-emerald-900 font-black text-2xl flex items-center justify-center shadow-md">
                  {userName.charAt(0)}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-base text-white">{userName}</h4>
                  <p className="text-xs text-emerald-100 font-medium">{occupation}</p>
                  <p className="text-[10px] text-emerald-200 font-mono">এনআইডি: {nidNumber}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-emerald-300 block text-[9px]">অবস্থান / জেলা:</span>
                  <span className="font-bold">{location}</span>
                </div>
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <QrCode size={36} className="text-emerald-950" />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Download size={15} />
                <span>আইডি কার্ড ডাউনলোড / প্রিন্ট</span>
              </button>
              <button
                onClick={() => setShowIdCardModal(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. COMPANY CONTACT MODAL                                 */}
      {/* ======================================================== */}
      {contactModalJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">নিয়োগকারী প্রতিষ্ঠানের যোগাযোগ</h3>
              <button onClick={() => setContactModalJob(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 text-sm">{contactModalJob.company}</p>
              <p className="text-slate-500">পদবী: {contactModalJob.title}</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mt-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={14} className="text-emerald-600" />
                  <span className="font-bold font-mono">{contactModalJob.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={14} className="text-emerald-600" />
                  <span>{contactModalJob.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setContactModalJob(null)}
              className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
