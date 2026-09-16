import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogoIcon } from '../../components/common';
import {
  LayoutDashboard,
  Plus,
  Briefcase,
  Users,
  FileSpreadsheet,
  Building2,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  Star,
  LogOut,
  Bell,
  ChevronRight,
  Eye,
  Trash2,
  X,
  Phone,
  Mail,
  RefreshCw,
  UserCheck,
  UserX,
  Edit,
  FileText,
  AlertCircle,
  Award,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toBengaliNumber } from '../../utils/formatters';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'jobs' | 'applications' | 'profile'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [deleteConfirmJobId, setDeleteConfirmJobId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Sample or state-driven company jobs
  const [companyJobs, setCompanyJobs] = useState([
    {
      id: 'job-101',
      title: 'কমার্শিয়াল টাওয়ারের জন্য সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      category: 'ইলেকট্রিক্যাল ও ইলেকট্রনিক্স',
      location: 'গুলশান এভিনিউ, ঢাকা',
      vacancies: 2,
      salaryMin: 900,
      salaryMax: 1200,
      salaryType: 'daily',
      status: 'active', // 'active' | 'paused'
      applicantsCount: 4,
      createdAt: '১৫ সেপ্টেম্বর ২০২৬',
    },
    {
      id: 'job-102',
      title: 'সিভিল রাজমিস্ত্রি ও টাইলস স্পেশালিস্ট',
      category: 'নির্মাণ ও রাজমিস্ত্রি',
      location: 'উত্তরা সেক্টর ৭, ঢাকা',
      vacancies: 4,
      salaryMin: 800,
      salaryMax: 1000,
      salaryType: 'daily',
      status: 'active',
      applicantsCount: 6,
      createdAt: '১২ সেপ্টেম্বর ২০২৬',
    },
    {
      id: 'job-103',
      title: 'হেভি ক্রেন ও এক্সকাভেটর ড্রাইভার',
      category: 'পরিবহন ও ড্রাইভিং',
      location: 'আশুলিয়া, ঢাকা',
      vacancies: 1,
      salaryMin: 28000,
      salaryMax: 35000,
      salaryType: 'monthly',
      status: 'paused',
      applicantsCount: 2,
      createdAt: '০৮ সেপ্টেম্বর ২০২৬',
    },
  ]);

  // Candidates who applied
  const [candidates, setCandidates] = useState([
    {
      id: 'cand-1',
      name: 'মোঃ রহিম উদ্দিন',
      occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      appliedFor: 'কমার্শিয়াল টাওয়ারের জন্য সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      jobId: 'job-101',
      experienceYears: 7,
      rating: 4.9,
      expectedSalary: '৳ ১,০০০ / দৈনিক',
      phone: '০১৭০০-০০০০০১',
      email: 'rahim@demo.shramikid.local',
      location: 'মিরপুর-১০, ঢাকা',
      nidVerified: true,
      skills: ['৩-ফেজ ওয়্যারিং', 'সার্কিট ব্রেকার', 'মোটর ওয়াইন্ডিং', 'আইপিএস সেটআপ'],
      status: 'shortlisted', // 'pending' | 'shortlisted' | 'accepted' | 'rejected'
      appliedAt: '২ দিন আগে',
    },
    {
      id: 'cand-2',
      name: 'মোঃ জাহিদ হাসান',
      occupation: 'টাইলস ও মার্বেল মিস্ত্রি',
      appliedFor: 'সিভিল রাজমিস্ত্রি ও টাইলস স্পেশালিস্ট',
      jobId: 'job-102',
      experienceYears: 5,
      rating: 4.8,
      expectedSalary: '৳ ৯০০ / দৈনিক',
      phone: '০১৮০০-১১২২৩৩',
      email: 'zahid@demo.shramikid.local',
      location: 'গাজীপুর',
      nidVerified: true,
      skills: ['টাইলস ফিটিং', 'মার্বেল কাটিং', 'প্লাস্টারিং'],
      status: 'pending',
      appliedAt: '১ দিন আগে',
    },
    {
      id: 'cand-3',
      name: 'মোঃ সাইদুল ইসলাম',
      occupation: 'হেভি ভেহিকেল ড্রাইভার',
      appliedFor: 'হেভি ক্রেন ও এক্সকাভেটর ড্রাইভার',
      jobId: 'job-103',
      experienceYears: 8,
      rating: 4.7,
      expectedSalary: '৳ ৩২,০০০ / মাসিক',
      phone: '০১৯০০-৪৪৩৩২২',
      email: 'saidul@demo.shramikid.local',
      location: 'নারায়ণগঞ্জ',
      nidVerified: true,
      skills: ['ক্রেন অপারেশন', 'এক্সকাভেটর ড্রাইভিং', 'হেভি লাইসেন্স'],
      status: 'accepted',
      appliedAt: '৫ দিন আগে',
    },
  ]);

  // New Job Form State
  const [newJobData, setNewJobData] = useState({
    title: '',
    category: 'ইলেকট্রিক্যাল ও ইলেকট্রনিক্স',
    vacancies: 1,
    division: 'ঢাকা',
    district: 'ঢাকা',
    address: 'গুলশান, ঢাকা',
    salaryMin: '',
    salaryMax: '',
    salaryType: 'daily',
    employmentType: 'full-time',
    description: '',
    requirements: '',
  });

  const profile = user?.employerProfile || {};
  const companyName = profile.companyName || user?.name || 'এবিসি কনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট';
  const contactPerson = profile.contactPerson || user?.name || 'ইঞ্জিঃ ফারহান চৌধুরী';
  const tradeLicense = profile.tradeLicenseNo || 'TRAD/DSCC/019283/2024';
  const companyPhone = profile.contactPhone || user?.phone || '০১৭০০-১২৩৪৫৬';
  const companyLocation = profile.district ? `${profile.district}, ${profile.division || ''}` : 'গুলশান এভিনিউ, ঢাকা';

  // Handler: Post New Job
  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobData.title.trim()) {
      setToastMessage('অনুগ্রহ করে সার্কুলারের শিরোনাম লিখুন');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    const created = {
      id: `job-${Date.now()}`,
      title: newJobData.title,
      category: newJobData.category,
      location: `${newJobData.address}, ${newJobData.district}`,
      vacancies: Number(newJobData.vacancies) || 1,
      salaryMin: Number(newJobData.salaryMin) || 800,
      salaryMax: Number(newJobData.salaryMax) || 1200,
      salaryType: newJobData.salaryType,
      status: 'active',
      applicantsCount: 0,
      createdAt: 'আজ প্রকাশিত',
    };

    setCompanyJobs((prev) => [created, ...prev]);
    setShowPostJobModal(false);
    setNewJobData({
      title: '',
      category: 'ইলেকট্রিক্যাল ও ইলেকট্রনিক্স',
      vacancies: 1,
      division: 'ঢাকা',
      district: 'ঢাকা',
      address: 'গুলশান, ঢাকা',
      salaryMin: '',
      salaryMax: '',
      salaryType: 'daily',
      employmentType: 'full-time',
      description: '',
      requirements: '',
    });

    setToastMessage('নতুন কাজের সার্কুলার সফলভাবে প্রকাশিত হয়েছে!');
    setTimeout(() => setToastMessage(''), 4500);
    setActiveTab('jobs');
  };

  // Handler: Toggle Job Status (Pause/Active)
  const handleToggleJobStatus = (jobId) => {
    setCompanyJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: j.status === 'active' ? 'paused' : 'active' } : j
      )
    );
    setToastMessage('সার্কুলার স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handler: Delete Job
  const handleDeleteJob = (jobId) => {
    setCompanyJobs((prev) => prev.filter((j) => j.id !== jobId));
    setDeleteConfirmJobId(null);
    setToastMessage('সার্কুলারটি সফলভাবে মুছে ফেলা হয়েছে!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Handler: Update Candidate Application Status
  const handleUpdateCandidateStatus = (candidateId, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );

    let statusText = 'শর্টলিস্ট করা হয়েছে';
    if (newStatus === 'accepted') statusText = 'নিয়োগের জন্য গৃহীত হয়েছে';
    if (newStatus === 'rejected') statusText = 'বাতিল করা হয়েছে';

    setToastMessage(`প্রার্থীর আবেদন '${statusText}'!`);
    setTimeout(() => setToastMessage(''), 4000);
    setSelectedCandidate(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarNavItems = [
    { id: 'overview', label: 'ড্যাশবোর্ড সারসংক্ষেপ', icon: <LayoutDashboard size={18} /> },
    { id: 'jobs', label: 'সার্কুলার ব্যবস্থাপনা', icon: <Briefcase size={18} /> },
    { id: 'applications', label: 'প্রাপ্ত আবেদনপত্রসমূহ', icon: <FileSpreadsheet size={18} /> },
    { id: 'workers', label: 'দক্ষ কর্মী খুঁজুন', icon: <Users size={18} />, external: '/workers' },
    { id: 'profile', label: 'কোম্পানি প্রোফাইল ও তথ্য', icon: <Building2 size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-blue-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-blue-600 text-xs sm:text-sm font-bold">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. EMPLOYER SIDEBAR NAVIGATION                           */}
      {/* ======================================================== */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-sm`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-800/20 flex-shrink-0">
              <LogoIcon size={24} />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-slate-900 tracking-tight leading-tight">
                  শ্রমিক<span className="text-blue-600">আইডি</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  নিয়োগকর্তা প্যানেল
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Company Mini Card in Sidebar */}
        {sidebarOpen && (
          <div className="p-4 mx-3 my-2 bg-blue-50/70 border border-blue-100 rounded-2xl">
            <p className="font-bold text-slate-900 text-xs truncate">{companyName}</p>
            <p className="text-[11px] text-blue-800 font-medium truncate mt-0.5">{contactPerson}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-900 font-bold bg-blue-200/70 px-2 py-0.5 rounded-md w-fit">
              <ShieldCheck size={12} />
              <span>যাচাইকৃত প্রতিষ্ঠান</span>
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
                    ? 'bg-blue-700 text-white shadow-sm shadow-blue-800/20'
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
        {/* Header Bar */}
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
                {activeTab === 'overview' && 'নিয়োগকর্তা ড্যাশবোর্ড সারসংক্ষেপ'}
                {activeTab === 'jobs' && 'কাজের সার্কুলার নিয়ন্ত্রণ ও ব্যবস্থাপনা'}
                {activeTab === 'applications' && 'প্রাপ্ত চাকরির আবেদন ও প্রার্থী যাচাই'}
                {activeTab === 'profile' && 'প্রতিষ্ঠান প্রোফাইল ও ট্রেড লাইসেন্স'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                সরাসরি সার্কুলার প্রকাশ, আবেদন পর্যবেক্ষণ ও দক্ষ শ্রমিক নিয়োগ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowPostJobModal(true)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-800/20"
            >
              <Plus size={16} />
              <span>নতুন সার্কুলার প্রকাশ</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-colors relative"
                title="বিজ্ঞপ্তি"
              >
                <Bell size={18} />
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full absolute top-1.5 right-1.5 border-2 border-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">বিজ্ঞপ্তিসমূহ</span>
                    <button onClick={() => setNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                      <p className="font-bold text-slate-900">নতুন প্রার্থী আবেদন করেছেন</p>
                      <p className="text-slate-600 text-[11px]">মোঃ জাহিদ হাসান টাইলস মিস্ত্রি পদে আবেদন জমা দিয়েছেন।</p>
                      <span className="text-[10px] text-slate-400 block pt-1">১ ঘণ্টা আগে</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-5 sm:p-7 space-y-6 custom-scrollbar">
          {/* -------------------------------------------------------- */}
          {/* TAB 1: OVERVIEW                                          */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Company Welcome Banner */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-blue-800/20">
                    {companyName.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">{companyName}</h2>
                      <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-blue-200">
                        <ShieldCheck size={13} className="text-blue-700" /> ট্রেড লাইসেন্স সত্যায়িত
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                      দায়িত্বপ্রাপ্ত: {contactPerson} • {companyLocation}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ট্রেড লাইসেন্স নম্বর: <strong className="text-slate-700">{tradeLicense}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => setShowPostJobModal(true)}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Plus size={16} />
                    <span>নতুন সার্কুলার পোস্ট</span>
                  </button>
                  <Link
                    to="/workers"
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-300"
                  >
                    <Users size={16} />
                    <span>শ্রমিক ডিরেক্টরি</span>
                  </Link>
                </div>
              </div>

              {/* 4 Clean Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('jobs')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">সক্রিয় সার্কুলার</span>
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <Briefcase size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">
                    {toBengaliNumber(companyJobs.filter((j) => j.status === 'active').length)} টি
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">লাইভ নিয়োগ চলমান</p>
                </div>

                <div
                  onClick={() => setActiveTab('applications')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">প্রাপ্ত আবেদনপত্র</span>
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <FileSpreadsheet size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-emerald-700">{toBengaliNumber(candidates.length)} জন</p>
                  <p className="text-[11px] text-emerald-600 mt-1">যাচাইকৃত দক্ষ কর্মী</p>
                </div>

                <div
                  onClick={() => setActiveTab('applications')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">শর্টলিস্টেড প্রার্থী</span>
                    <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <UserCheck size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">
                    {toBengaliNumber(candidates.filter((c) => c.status === 'shortlisted').length)} জন
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">সাক্ষাৎকারের অপেক্ষায়</p>
                </div>

                <div
                  onClick={() => navigate('/workers')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">নিয়োগকৃত কর্মী</span>
                    <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                      <ShieldCheck size={16} />
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{toBengaliNumber(8)} জন</p>
                  <p className="text-[11px] text-slate-400 mt-1">সক্রিয় কর্মরত</p>
                </div>
              </div>

              {/* Active Jobs Overview Table */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">আপনার সক্রিয় সার্কুলার তালিকা</h3>
                    <p className="text-xs text-slate-500">চলমান কাজের সার্কুলার ও প্রার্থী আবেদন সংখ্যা</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>সকল সার্কুলার ({toBengaliNumber(companyJobs.length)})</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {companyJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                              job.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : 'bg-slate-200 text-slate-700 border-slate-300'
                            }`}
                          >
                            {job.status === 'active' ? 'সক্রিয় সার্কুলার' : 'স্থগিত'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                          <span className="text-slate-500">{job.category}</span>
                          <span>•</span>
                          <MapPin size={13} className="text-slate-400" />
                          <span>{job.location}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-800">পদসংখ্যা: {toBengaliNumber(job.vacancies)} জন</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200">
                          {toBengaliNumber(job.applicantsCount)} জন আবেদনকারী
                        </span>
                        <button
                          onClick={() => handleToggleJobStatus(job.id)}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all"
                        >
                          {job.status === 'active' ? 'স্থগিত করুন' : 'সক্রিয় করুন'}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmJobId(job.id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl transition-all"
                          title="সার্কুলার মুছে ফেলুন"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applicants Section */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">সাম্প্রতিক প্রার্থী আবেদন</h3>
                    <p className="text-xs text-slate-500">ভেরিফাইড শ্রমিকদের স্কিল পাসপোর্ট ও আবেদনপত্র</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>সকল প্রার্থী ({toBengaliNumber(candidates.length)})</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {candidates.map((cand) => (
                    <div
                      key={cand.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {cand.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{cand.name}</h4>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                              <ShieldCheck size={11} /> এনআইডি ভেরিফাইড
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">
                            {cand.occupation} • অভিজ্ঞতা: {toBengaliNumber(cand.experienceYears)} বছর • রেটিং: {toBengaliNumber(cand.rating)}
                          </p>
                          <p className="text-[11px] text-blue-700 font-semibold">{cand.appliedFor}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                          onClick={() => setSelectedCandidate(cand)}
                          className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all"
                        >
                          প্রোফাইল পরীক্ষা
                        </button>
                        {cand.status !== 'accepted' && (
                          <button
                            onClick={() => handleUpdateCandidateStatus(cand.id, 'accepted')}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                          >
                            নিয়োগ অনুমোদন
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 2: JOBS MANAGEMENT                                   */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'jobs' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">সার্কুলার নিয়ন্ত্রণ ও ব্যবস্থাপনা</h3>
                  <p className="text-xs text-slate-500">আপনার প্রকাশিত সমস্ত চাকরির সার্কুলার পর্যবেক্ষণ ও সম্পাদনা</p>
                </div>
                <button
                  onClick={() => setShowPostJobModal(true)}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm w-fit"
                >
                  <Plus size={16} />
                  <span>নতুন সার্কুলার যোগ করুন</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">সার্কুলারের শিরোনাম</th>
                      <th className="px-5 py-3.5">ক্যাটাগরি ও স্থান</th>
                      <th className="px-5 py-3.5">মজুরি কাঠামো</th>
                      <th className="px-5 py-3.5">আবেদন সংখ্যা</th>
                      <th className="px-5 py-3.5">স্ট্যাটাস</th>
                      <th className="px-5 py-3.5 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {companyJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-900 text-sm">{job.title}</p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">প্রকাশিত: {job.createdAt}</span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          <p className="font-semibold text-slate-800">{job.category}</p>
                          <p className="text-[11px] text-slate-500">{job.location}</p>
                        </td>
                        <td className="px-5 py-4 font-bold text-emerald-700">
                          ৳ {toBengaliNumber(job.salaryMin)} - ৳ {toBengaliNumber(job.salaryMax)} /{job.salaryType === 'daily' ? 'দৈনিক' : 'মাসিক'}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg font-bold">
                            {toBengaliNumber(job.applicantsCount)} জন
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                              job.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border-slate-300'
                            }`}
                          >
                            {job.status === 'active' ? 'সক্রিয়' : 'স্থগিত'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleJobStatus(job.id)}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-bold text-[11px]"
                            >
                              {job.status === 'active' ? 'স্থগিত' : 'চালু'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmJobId(job.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-lg"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 3: APPLICATIONS & CANDIDATES                         */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'applications' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">প্রাপ্ত সকল চাকরির আবেদনপত্র</h3>
                  <p className="text-xs text-slate-500">প্রার্থীদের যাচাইকৃত স্কিল ও শর্টলিস্টিং ব্যবস্থাপনা</p>
                </div>
              </div>

              <div className="space-y-3">
                {candidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center text-base shadow-sm">
                        {cand.name.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-base">{cand.name}</h4>
                          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                            <ShieldCheck size={12} /> এনআইডি ভেরিফাইড
                          </span>
                          {cand.status === 'shortlisted' && (
                            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                              শর্টলিস্টেড
                            </span>
                          )}
                          {cand.status === 'accepted' && (
                            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                              নিয়োগের জন্য অনুমোদিত
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">
                          {cand.occupation} • অবস্থান: {cand.location} • প্রত্যাশিত মজুরি: <strong className="text-emerald-700">{cand.expectedSalary}</strong>
                        </p>
                        <p className="text-xs text-blue-800 font-medium">আবেদনকৃত পদ: {cand.appliedFor}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all"
                      >
                        বিস্তারিত দেখুন
                      </button>
                      {cand.status !== 'shortlisted' && cand.status !== 'accepted' && (
                        <button
                          onClick={() => handleUpdateCandidateStatus(cand.id, 'shortlisted')}
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all"
                        >
                          শর্টলিস্ট করুন
                        </button>
                      )}
                      {cand.status !== 'accepted' && (
                        <button
                          onClick={() => handleUpdateCandidateStatus(cand.id, 'accepted')}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                        >
                          নিয়োগ অনুমোদন
                        </button>
                      )}
                      {cand.status !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateCandidateStatus(cand.id, 'rejected')}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                        >
                          বাতিল
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 4: COMPANY PROFILE & SETTINGS                        */}
          {/* -------------------------------------------------------- */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">কোম্পানি প্রোফাইল ও সেটিংস</h3>
                  <p className="text-xs text-slate-500">প্রতিষ্ঠানের অফিসিয়াল তথ্য ও ট্রেড লাইসেন্স বিবরণ</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck size={13} /> ভেরিফাইড নিয়োগকারী
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">কোম্পানি / প্রতিষ্ঠানের নাম</label>
                  <input
                    type="text"
                    disabled
                    value={companyName}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ট্রেড লাইসেন্স নম্বর</label>
                    <input
                      type="text"
                      disabled
                      value={tradeLicense}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">দায়িত্বপ্রাপ্ত কর্মকর্তা</label>
                    <input
                      type="text"
                      defaultValue={contactPerson}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-medium focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">যোগাযোগের মোবাইল নম্বর</label>
                    <input
                      type="text"
                      defaultValue={companyPhone}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-mono focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">অফিসের ঠিকানা ও জেলা</label>
                    <input
                      type="text"
                      defaultValue={companyLocation}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setToastMessage('কোম্পানি প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে!');
                      setTimeout(() => setToastMessage(''), 3500);
                    }}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                  >
                    তথ্য আপডেট করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* 3. POST NEW JOB MODAL                                    */}
      {/* ======================================================== */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-fadeIn custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">নতুন কাজের সার্কুলার প্রকাশ করুন</h3>
                <p className="text-xs text-slate-500">ভেরিফাইড দক্ষ শ্রমিকদের কাছে সরাসরি নিয়োগ বিজ্ঞপ্তি পাঠান</p>
              </div>
              <button
                onClick={() => setShowPostJobModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">কাজের পদবী / সার্কুলারের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ৩-ফেজ লাইনের জন্য অভিজ্ঞ ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান"
                  value={newJobData.title}
                  onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">পেশা / কাজের ক্যাটাগরি</label>
                  <select
                    value={newJobData.category}
                    onChange={(e) => setNewJobData({ ...newJobData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="ইলেকট্রিক্যাল ও ইলেকট্রনিক্স">ইলেকট্রিক্যাল ও ইলেকট্রনিক্স</option>
                    <option value="নির্মাণ ও রাজমিস্ত্রি">নির্মাণ ও রাজমিস্ত্রি</option>
                    <option value="দর্জি ও গার্মেন্টস">দর্জি ও গার্মেন্টস</option>
                    <option value="পরিবহন ও ড্রাইভিং">পরিবহন ও ড্রাইভিং</option>
                    <option value="প্লাম্বিং ও স্যানিটারি">প্লাম্বিং ও স্যানিটারি</option>
                    <option value="কাঠমিস্ত্রি ও ফার্নিচার">কাঠমিস্ত্রি ও ফার্নিচার</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">প্রয়োজনীয় লোকসংখ্যা (পদসংখ্যা)</label>
                  <input
                    type="number"
                    min="1"
                    value={newJobData.vacancies}
                    onChange={(e) => setNewJobData({ ...newJobData, vacancies: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ন্যূনতম মজুরি (৳)</label>
                  <input
                    type="number"
                    placeholder="৮০০"
                    value={newJobData.salaryMin}
                    onChange={(e) => setNewJobData({ ...newJobData, salaryMin: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">সর্বোচ্চ মজুরি (৳)</label>
                  <input
                    type="number"
                    placeholder="১২০০"
                    value={newJobData.salaryMax}
                    onChange={(e) => setNewJobData({ ...newJobData, salaryMax: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মজুরির ধরন</label>
                  <select
                    value={newJobData.salaryType}
                    onChange={(e) => setNewJobData({ ...newJobData, salaryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="daily">দৈনিক</option>
                    <option value="monthly">মাসিক</option>
                    <option value="hourly">ঘণ্টাপ্রতি</option>
                    <option value="contract">চুক্তিভিত্তিক</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">কাজের জেলা</label>
                  <select
                    value={newJobData.district}
                    onChange={(e) => setNewJobData({ ...newJobData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="ঢাকা">ঢাকা</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                    <option value="গাজীপুর">গাজীপুর</option>
                    <option value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</option>
                    <option value="সিলেট">সিলেট</option>
                    <option value="খুলনা">খুলনা</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">কাজের সুনির্দিষ্ট স্থান / এলাকা</label>
                  <input
                    type="text"
                    placeholder="যেমন: গুলশান এভিনিউ, সেক্টর ৭"
                    value={newJobData.address}
                    onChange={(e) => setNewJobData({ ...newJobData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">কাজের বিবরণ ও দায়িত্ব</label>
                <textarea
                  rows={3}
                  placeholder="কাজের মূল দায়িত্ব ও কাজের সময় সম্পর্কে লিখুন..."
                  value={newJobData.description}
                  onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                >
                  সার্কুলার প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CANDIDATE DETAILS INSPECTION MODAL                    */}
      {/* ======================================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <ShieldCheck size={18} className="text-blue-700" />
                <span>প্রার্থীর ডিজিটাল স্কিল পাসপোর্ট বিবরণ</span>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white font-black text-xl flex items-center justify-center shadow-md">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">{selectedCandidate.name}</h4>
                <p className="text-xs text-blue-700 font-semibold">{selectedCandidate.occupation}</p>
                <p className="text-[11px] text-slate-500">অভিজ্ঞতা: {toBengaliNumber(selectedCandidate.experienceYears)} বছর • রেটিং: {toBengaliNumber(selectedCandidate.rating)} ★</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">যোগাযোগ নম্বর:</span>
                <span className="font-bold font-mono text-slate-900">{selectedCandidate.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">অবস্থান / এলাকা:</span>
                <span className="font-bold text-slate-900">{selectedCandidate.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">প্রত্যাশিত মজুরি:</span>
                <span className="font-bold text-emerald-700">{selectedCandidate.expectedSalary}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">সত্যায়িত দক্ষতাসমূহ:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => handleUpdateCandidateStatus(selectedCandidate.id, 'shortlisted')}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-all"
              >
                শর্টলিস্ট
              </button>
              <button
                onClick={() => handleUpdateCandidateStatus(selectedCandidate.id, 'accepted')}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all"
              >
                নিয়োগ অনুমোদন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. DELETE JOB CONFIRMATION MODAL                         */}
      {/* ======================================================== */}
      {deleteConfirmJobId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="font-bold text-slate-900 text-base">সার্কুলার মুছে ফেলতে চান?</h3>
              <p className="text-xs text-slate-500">
                মুছে ফেললে সার্কুলারটি লাইভ পোর্টাল থেকে অপসারিত হবে।
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmJobId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDeleteJob(deleteConfirmJobId)}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-all"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
