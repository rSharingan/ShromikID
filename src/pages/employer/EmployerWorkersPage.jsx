import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, LoadingState, EmptyState } from '../../components/common';
import WorkerCard from '../../components/common/WorkerCard';
import {
  Search,
  MapPin,
  Award,
  Filter,
  Users,
  RefreshCw,
  Phone,
  MessageSquare,
  Send,
  X,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Briefcase,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  Star,
  Clock,
  DollarSign,
} from 'lucide-react';
import { workersService } from '../../services/api';
import { workers as fallbackWorkers } from '../../data/workers';
import { translateLocation, toBengaliNumber, toAsciiNumber } from '../../utils/formatters';
import { useAuth } from '../../contexts/AuthContext';

const EmployerWorkersPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    occupation: '',
    verified: false,
  });
  const [allWorkers, setAllWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Direct Call Modal & Connect Modal State
  const [callModalWorker, setCallModalWorker] = useState(null);
  const [connectModalWorker, setConnectModalWorker] = useState(null);
  const [offerJobTitle, setOfferJobTitle] = useState('কমার্শিয়াল টাওয়ারের জন্য সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান');
  const [offerWage, setOfferWage] = useState('১০০০');
  const [offerWageType, setOfferWageType] = useState('দৈনিক');
  const [offerMessage, setOfferMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const res = await workersService.getWorkers({
        search: searchTerm,
        district: filters.location,
        occupation: filters.occupation,
      });

      if (res.success && res.data && res.data.length > 0) {
        setAllWorkers(res.data);
        setFilteredWorkers(res.data);
      } else {
        setAllWorkers(fallbackWorkers);
        setFilteredWorkers(fallbackWorkers);
      }
    } catch (err) {
      setAllWorkers(fallbackWorkers);
      setFilteredWorkers(fallbackWorkers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };

  const applyFilters = (activeFilters, query) => {
    let results = allWorkers.filter((worker) => {
      const name = worker.name || '';
      const occupation = worker.occupation || worker.workerProfile?.occupation || '';
      const location = worker.location || worker.workerProfile?.district || '';
      const isVerified = worker.verified || worker.verificationStatus === 'verified';

      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query.toLowerCase()) ||
        occupation.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = !activeFilters.location || location === activeFilters.location;
      const matchesOccupation = !activeFilters.occupation || occupation === activeFilters.occupation;
      const matchesVerified = !activeFilters.verified || isVerified;

      return matchesSearch && matchesLocation && matchesOccupation && matchesVerified;
    });

    setFilteredWorkers(results);
  };

  const occupations = [
    { value: '', label: 'সকল পেশা / ট্রেড' },
    { value: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান', label: 'ইলেকট্রিশিয়ান' },
    { value: 'অভিজ্ঞ সিভিল রাজমিস্ত্রি', label: 'রাজমিস্ত্রি' },
    { value: 'মাস্টার টেইলার ও প্যাটার্ন মেকার', label: 'দর্জি ও টেইলার' },
    { value: 'স্যানিটারি ও পাইপ ফিটিং মিস্ত্রি', label: 'প্লাম্বার' },
    { value: 'হেভি ট্রাক ও ক্রেন ড্রাইভার', label: 'ড্রাইভার ও অপারেটর' },
  ];

  const locations = [
    { value: '', label: 'সকল জেলা' },
    { value: 'Dhaka', label: 'ঢাকা' },
    { value: 'Chittagong', label: 'চট্টগ্রাম' },
    { value: 'Sylhet', label: 'সিলেট' },
    { value: 'Khulna', label: 'খুলনা' },
    { value: 'Rajshahi', label: 'রাজশাহী' },
    { value: 'Barisal', label: 'বরিশাল' },
    { value: 'Rangpur', label: 'রংপুর' },
  ];

  const handleSendJobOffer = (e) => {
    e.preventDefault();
    setToastMessage(`শ্রমিক '${connectModalWorker.name}'-কে কাজের সরাসরি অফার ও ইনভাইটেশন পাঠানো হয়েছে!`);
    setTimeout(() => setToastMessage(''), 4500);
    setConnectModalWorker(null);
    setOfferMessage('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarNavItems = [
    { label: 'ড্যাশবোর্ড', href: '/employer/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'দক্ষ কর্মী ডিরেক্টরি', href: '/employer/workers', icon: <Users size={18} />, active: true },
    { label: 'সার্কুলার ব্যবস্থাপনা', href: '/employer/dashboard', icon: <Briefcase size={18} /> },
    { label: 'প্রাপ্ত আবেদনসমূহ', href: '/employer/dashboard', icon: <FileSpreadsheet size={18} /> },
    { label: 'কোম্পানি প্রোফাইল', href: '/employer/dashboard', icon: <Building2 size={18} /> },
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

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-sm`}
      >
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
                  কর্মী ডিরেক্টরি
                </span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {sidebarNavItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.href)}
              className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 transition-all text-xs font-bold ${
                item.active
                  ? 'bg-blue-700 text-white shadow-sm shadow-blue-800/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className={item.active ? 'text-white' : 'text-slate-500'}>
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

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

      {/* Main Content Area */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors border border-slate-200"
            >
              <Users size={18} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                দক্ষ ও ভেরিফাইড কর্মী ডিরেক্টরি
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                সরাসরি ফোন কল ও নিয়োগের অফার পাঠিয়ে দক্ষ কর্মী সংগ্রহ করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/employer/dashboard"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              ড্যাশবোর্ডে ফিরে যান
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-5 sm:p-7 space-y-6 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 sticky top-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <label className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Filter size={16} className="text-blue-700" />
                    ফিল্টার সমূহ
                  </label>
                  <button
                    onClick={fetchWorkers}
                    className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> রিফ্রেশ
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">কর্মী অনুসন্ধান</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
                    <input
                      type="text"
                      placeholder="নাম বা ট্রেড দিয়ে খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        applyFilters(filters, e.target.value);
                      }}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পেশা / ট্রেড</label>
                  <select
                    name="occupation"
                    value={filters.occupation}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {occupations.map((occ, i) => (
                      <option key={i} value={occ.value}>
                        {occ.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অবস্থান / জেলা</label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {locations.map((loc, i) => (
                      <option key={i} value={loc.value}>
                        {loc.label}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => {
                      const newFilters = { ...filters, verified: e.target.checked };
                      setFilters(newFilters);
                      applyFilters(newFilters, searchTerm);
                    }}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">শুধুমাত্র যাচাইকৃত কর্মী</span>
                </label>

                {(Object.values(filters).some((v) => v) || searchTerm) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({ location: '', occupation: '', verified: false });
                      setFilteredWorkers(allWorkers);
                    }}
                    className="w-full py-2 text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    ফিল্টার রিসেট করুন
                  </button>
                )}
              </div>
            </div>

            {/* Workers Grid */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  মোট {toBengaliNumber(filteredWorkers.length)} জন কর্মী প্রদর্শিত হচ্ছে
                </h2>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  সরাসরি কল করুন অথবা কাজের অফার পাঠান
                </span>
              </div>

              {loading ? (
                <div className="py-12 bg-white rounded-3xl border border-slate-200">
                  <LoadingState message="কর্মী তালিকা লোড হচ্ছে..." />
                </div>
              ) : filteredWorkers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredWorkers.map((worker) => (
                    <WorkerCard
                      key={worker.id}
                      worker={worker}
                      onCall={(w) => setCallModalWorker(w)}
                      onConnect={(w) => setConnectModalWorker(w)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="কোনো কর্মী পাওয়া যায়নি"
                  description="আপনার ফিল্টার বা অনুসন্ধান শব্দ পরিবর্তন করে আবার চেষ্টা করুন।"
                  action={
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({ location: '', occupation: '', verified: false });
                        setFilteredWorkers(allWorkers);
                      }}
                      className="px-5 py-2 bg-blue-700 text-white rounded-full text-xs font-bold hover:bg-blue-800 transition-colors"
                    >
                      ফিল্টার রিসেট করুন
                    </button>
                  }
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================== */}
      {/* 1. DIRECT CALL MODAL                                     */}
      {/* ======================================================== */}
      {callModalWorker && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Phone size={18} className="text-emerald-600" />
                <span>সরাসরি কল করুন</span>
              </div>
              <button
                onClick={() => setCallModalWorker(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                {callModalWorker.name?.charAt(0) || 'শ'}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{callModalWorker.name}</h3>
                <p className="text-xs text-emerald-800 font-semibold">{callModalWorker.occupation || callModalWorker.workerProfile?.occupation || 'দক্ষ কর্মী'}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{callModalWorker.location || 'ঢাকা, বাংলাদেশ'}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-slate-400 text-[11px] block font-bold">শ্রমিকের মোবাইল নম্বর</span>
              <a
                href={`tel:${toAsciiNumber(callModalWorker.phone || '01700-000001').replace(/[^0-9+]/g, '')}`}
                className="text-lg font-black text-emerald-700 hover:text-emerald-800 font-mono tracking-wider block"
              >
                {callModalWorker.phone || '০১৭০০-০০০০০১'}
              </a>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${toAsciiNumber(callModalWorker.phone || '01700-000001').replace(/[^0-9+]/g, '')}`}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Phone size={16} />
                <span>এখনই ফোন কল করুন</span>
              </a>

              <a
                href={`https://wa.me/${toAsciiNumber(callModalWorker.phone || '8801700000001').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare size={16} />
                <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DIRECT CONNECT & JOB OFFER MODAL                      */}
      {/* ======================================================== */}
      {connectModalWorker && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Send size={18} className="text-blue-700" />
                <span>কাজের অফার ও সরাসরি যোগাযোগ</span>
              </div>
              <button
                onClick={() => setConnectModalWorker(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 bg-blue-50/70 border border-blue-100 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                {connectModalWorker.name?.charAt(0) || 'শ'}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{connectModalWorker.name}</h4>
                <p className="text-xs text-blue-800 font-semibold">{connectModalWorker.occupation || 'দক্ষ কর্মী'}</p>
                <span className="text-[10px] text-slate-500 block">মোবাইল: {connectModalWorker.phone || '০১৭০০-০০০০০১'}</span>
              </div>
            </div>

            <form onSubmit={handleSendJobOffer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">কাজের পদবী / সার্কুলার নির্বাচন করুন</label>
                <input
                  type="text"
                  required
                  value={offerJobTitle}
                  onChange={(e) => setOfferJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">প্রস্তাবিত মজুরি (৳)</label>
                  <input
                    type="number"
                    required
                    value={offerWage}
                    onChange={(e) => setOfferWage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মজুরির ধরন</label>
                  <select
                    value={offerWageType}
                    onChange={(e) => setOfferWageType(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="দৈনিক">দৈনিক মজুরি</option>
                    <option value="মাসিক">মাসিক বেতন</option>
                    <option value="প্রজেক্টভিত্তিক">চুক্তিভিত্তিক / প্রজেক্ট</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">শ্রমিকের জন্য বার্তা বা নির্দেশিকা (ঐচ্ছিক)</label>
                <textarea
                  rows={3}
                  placeholder="যেমন: আসসালামু আলাইকুম, আমরা আগামী রবিবার থেকে গুলশানে প্রজেক্টের কাজের জন্য আপনাকে যুক্ত করতে চাই..."
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConnectModalWorker(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Send size={14} />
                  <span>অফার পাঠিয়ে দিন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerWorkersPage;
