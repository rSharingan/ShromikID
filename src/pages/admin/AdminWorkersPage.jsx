import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '../../components/common';
import {
  LogOut,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  XCircle,
  LayoutDashboard,
  Building2,
  Briefcase,
  FileSpreadsheet,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  BarChart3,
  Settings,
  RotateCcw,
  MapPin,
  Award,
  Phone,
  Mail,
  UserCheck,
  UserX,
  Clock,
  ChevronRight,
  X,
  FileCheck,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { workersService, adminService } from '../../services/api';
import { toBengaliNumber, translateLocation } from '../../utils/formatters';

const AdminWorkersPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState('');
  
  // Status Change Confirmation Modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    worker: null,
    targetStatus: null, // 'pending' | 'verified' | 'rejected'
  });

  // Worker Details Inspection Modal
  const [selectedWorker, setSelectedWorker] = useState(null);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const res = await workersService.getWorkers({
        search: searchTerm,
        status: filterStatus === 'all' ? undefined : filterStatus,
      });

      if (res.success && res.data) {
        setWorkers(res.data);
      }
    } catch (err) {
      console.warn('Failed to load workers from server:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [filterStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWorkers();
  };

  const handleExecuteStatusChange = async (userId, newStatus) => {
    setActionLoading(userId);
    try {
      const res = await adminService.updateVerification(userId, newStatus);
      if (res.success) {
        let statusLabel = 'অনুমোদিত ও যাচাইকৃত';
        if (newStatus === 'pending') statusLabel = 'অপেক্ষমান (পেন্ডিং) তালিকায় পুনর্বহাল';
        if (newStatus === 'rejected') statusLabel = 'বাতিল / স্থগিত';

        setMessage(`শ্রমিক প্রোফাইল সফলভাবে '${statusLabel}' করা হয়েছে!`);
        
        // Update state locally
        setWorkers((prev) =>
          prev.map((w) => (w.id === userId ? { ...w, verificationStatus: newStatus } : w))
        );
      }
    } catch (err) {
      setMessage(`স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে: ${err.message}`);
    } finally {
      setActionLoading(null);
      setConfirmModal({ isOpen: false, worker: null, targetStatus: null });
      setTimeout(() => setMessage(''), 4500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: <LayoutDashboard size={19} /> },
    { label: 'শ্রমিক ব্যবস্থাপনা', href: '/admin/workers', icon: <Users size={19} />, active: true },
    { label: 'নিয়োগকর্তা তালিকা', href: '/admin/employers', icon: <Building2 size={19} /> },
    { label: 'কাজের সার্কুলার', href: '/admin/jobs', icon: <Briefcase size={19} /> },
    { label: 'আবেদনপত্রসমূহ', href: '/admin/applications', icon: <FileSpreadsheet size={19} /> },
    { label: 'যাচাইকরণ কিউ', href: '/admin/workers', icon: <ShieldCheck size={19} /> },
    { label: 'রিপোর্ট ও পরিসংখ্যান', href: '/admin/reports', icon: <BarChart3 size={19} /> },
    { label: 'সিস্টেম সেটিংস', href: '/admin/settings', icon: <Settings size={19} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      {message && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/50">
          <CheckCircle2 size={20} />
          <span className="text-xs sm:text-sm font-bold">{message}</span>
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

      {/* Main Content Area */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Header */}
        <header className="bg-[#0f172a]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors border border-slate-800"
            >
              <Users size={18} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">শ্রমিক ডেটাবেজ ও ভেরিফিকেশন নিয়ন্ত্রণ</h1>
              <p className="text-xs text-slate-400 hidden sm:block">জাতীয় পরিচয়পত্র ও স্কিল যাচাইকরণ, অনুমোদন ও পূর্বাবস্থায় ফিরিয়ে আনার পোর্টাল</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchWorkers}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-emerald-400' : ''} />
              <span>রিফ্রেশ</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-6 lg:p-8 space-y-6 custom-scrollbar">
          {/* Search & Filter Bar */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-3 w-full sm:w-1/2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800">
              <Search size={18} className="text-emerald-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="শ্রমিকের নাম, পেশা, জেলা বা মোবাইল নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </form>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="all">সকল ভেরিফিকেশন স্ট্যাটাস</option>
                <option value="verified">যাচাইকৃত (অনুমোদিত)</option>
                <option value="pending">অপেক্ষমান (পেন্ডিং)</option>
                <option value="rejected">বাতিলকৃত (স্থগিত)</option>
              </select>
            </div>
          </div>

          {/* Workers Table */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="px-6 py-4">শ্রমিক প্রোফাইল</th>
                    <th className="px-6 py-4">মূল পেশা ও ক্যাটাগরি</th>
                    <th className="px-6 py-4">অবস্থান ও অভিজ্ঞতা</th>
                    <th className="px-6 py-4">বর্তমান স্ট্যাটাস</th>
                    <th className="px-6 py-4 text-right">প্রশাসনিক পদক্ষেপ (অ্যাকশন ও আনডু)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {workers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                        <AlertCircle size={28} className="mx-auto mb-2 text-slate-500" />
                        <p className="font-bold text-white text-sm">কোনো শ্রমিক প্রোফাইল পাওয়া যায়নি</p>
                        <p className="text-xs text-slate-500 mt-1">অনুসন্ধানের কিওয়ার্ড বা ফিল্টার পরিবর্তন করে দেখুন।</p>
                      </td>
                    </tr>
                  ) : (
                    workers.map((worker) => {
                      const profile = worker.workerProfile || {};
                      const occupation = profile.occupation || 'দক্ষ কর্মী';
                      const location = profile.district ? `${translateLocation(profile.district)}, ${translateLocation(profile.division || '')}` : 'বাংলাদেশ';
                      const experience = profile.experienceYears || 0;
                      const status = worker.verificationStatus || 'pending';

                      return (
                        <tr key={worker.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center font-bold text-white shadow-md">
                                {worker.name?.charAt(0) || 'শ'}
                              </div>
                              <div>
                                <p className="font-bold text-white text-sm hover:text-emerald-400 cursor-pointer" onClick={() => setSelectedWorker(worker)}>
                                  {worker.name}
                                </p>
                                <p className="text-slate-400 text-[11px] font-mono">{worker.phone || worker.email || `ID: ${worker.id?.substring(0, 10)}...`}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-200">{occupation}</span>
                            <span className="block text-slate-400 text-[10px] mt-0.5">রেটিং: {toBengaliNumber(profile.rating || 4.8)} ★</span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-slate-300 flex items-center gap-1">
                              <MapPin size={12} className="text-emerald-400" />
                              {location}
                            </p>
                            <p className="text-slate-400 mt-0.5 font-semibold">{toBengaliNumber(experience)} বছর অভিজ্ঞতা</p>
                          </td>
                          <td className="px-6 py-4">
                            {status === 'verified' && (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px] flex items-center gap-1.5 w-fit">
                                <CheckCircle2 size={12} className="text-emerald-400" />
                                যাচাইকৃত
                              </span>
                            )}
                            {status === 'pending' && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-[11px] flex items-center gap-1.5 w-fit">
                                <Clock size={12} className="text-amber-400" />
                                অপেক্ষমান
                              </span>
                            )}
                            {status === 'rejected' && (
                              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 text-[11px] flex items-center gap-1.5 w-fit">
                                <XCircle size={12} className="text-rose-400" />
                                বাতিলকৃত
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Inspect Profile Details */}
                              <button
                                onClick={() => setSelectedWorker(worker)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
                                title="প্রোফাইল বিবরণ দেখুন"
                              >
                                <Eye size={15} />
                              </button>

                              {/* State 1: Worker is Verified -> Admin can Undo to Pending or Revoke */}
                              {status === 'verified' && (
                                <>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, worker, targetStatus: 'pending' })}
                                    disabled={actionLoading === worker.id}
                                    className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-600 text-amber-300 hover:text-white rounded-xl border border-amber-500/30 text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    title="ভেরিফিকেশন পূর্বাবস্থায় আনুন (Undo Confirmation to Pending)"
                                  >
                                    <RotateCcw size={13} />
                                    <span>আনডু (পেন্ডিং করুন)</span>
                                  </button>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, worker, targetStatus: 'rejected' })}
                                    disabled={actionLoading === worker.id}
                                    className="p-2 bg-rose-500/15 hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl border border-rose-500/30 transition-all"
                                    title="অনুমোদন বাতিল / স্থগিত করুন"
                                  >
                                    <UserX size={15} />
                                  </button>
                                </>
                              )}

                              {/* State 2: Worker is Pending -> Admin can Approve or Reject */}
                              {status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleExecuteStatusChange(worker.id, 'verified')}
                                    disabled={actionLoading === worker.id}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
                                  >
                                    {actionLoading === worker.id ? <RefreshCw size={13} className="animate-spin" /> : <UserCheck size={13} />}
                                    <span>অনুমোদন দিন</span>
                                  </button>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, worker, targetStatus: 'rejected' })}
                                    disabled={actionLoading === worker.id}
                                    className="p-2 bg-rose-500/15 hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl border border-rose-500/30 transition-all"
                                    title="বাতিল করুন"
                                  >
                                    <XCircle size={15} />
                                  </button>
                                </>
                              )}

                              {/* State 3: Worker is Rejected -> Admin can Re-Verify or Reset to Pending */}
                              {status === 'rejected' && (
                                <>
                                  <button
                                    onClick={() => handleExecuteStatusChange(worker.id, 'verified')}
                                    disabled={actionLoading === worker.id}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    title="পুনরায় অনুমোদন দিন"
                                  >
                                    <CheckCircle2 size={13} />
                                    <span>পুনরায় অনুমোদন</span>
                                  </button>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, worker, targetStatus: 'pending' })}
                                    disabled={actionLoading === worker.id}
                                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
                                    title="পেন্ডিং তালিকায় ফেরত নিন"
                                  >
                                    <RotateCcw size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Footer Summary */}
            <div className="p-4 bg-[#0f172a] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>সর্বমোট {toBengaliNumber(workers.length)} জন নিবন্ধিত শ্রমিক তালিকাভুক্ত</span>
              <span className="text-emerald-400 font-semibold">সরাসরি ডেটাবেজ সিঙ্ক্রোনাইজড</span>
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================== */}
      {/* UNDO / STATUS CONFIRMATION MODAL                         */}
      {/* ======================================================== */}
      {confirmModal.isOpen && confirmModal.worker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131b2e] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border ${
              confirmModal.targetStatus === 'pending'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}>
              {confirmModal.targetStatus === 'pending' ? <RotateCcw size={24} /> : <ShieldAlert size={24} />}
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">
                {confirmModal.targetStatus === 'pending'
                  ? 'আপনি কি ভেরিফিকেশন পূর্বাবস্থায় (Undo) ফিরিয়ে নিতে চান?'
                  : 'আপনি কি এই শ্রমিকের ভেরিফিকেশন বাতিল বা স্থগিত করতে চান?'}
              </h3>
              <p className="text-xs text-slate-300">
                শ্রমিক: <strong className="text-white">{confirmModal.worker.name}</strong> ({confirmModal.worker.workerProfile?.occupation || 'দক্ষ কর্মী'})
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {confirmModal.targetStatus === 'pending'
                  ? 'এই পদক্ষেপটি নিলে শ্রমিকের ভেরিফাইড ব্যাজ সাময়িকভাবে প্রত্যাহার হবে এবং প্রোফাইলটি পুনরায় অ্যাডমিন ভেরিফিকেশন কিউ (অপেক্ষমান তালিকায়) স্থানান্তরিত হবে।'
                  : 'বাতিল করলে এই শ্রমিক প্ল্যাটফর্মে আর ভেরিফাইড স্কিল পাসপোর্ট ব্যবহার করতে পারবেন না।'}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setConfirmModal({ isOpen: false, worker: null, targetStatus: null })}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                ফিরে যান
              </button>
              <button
                onClick={() => handleExecuteStatusChange(confirmModal.worker.id, confirmModal.targetStatus)}
                disabled={actionLoading === confirmModal.worker.id}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-1.5 ${
                  confirmModal.targetStatus === 'pending'
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30'
                }`}
              >
                {actionLoading === confirmModal.worker.id ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : confirmModal.targetStatus === 'pending' ? (
                  <RotateCcw size={14} />
                ) : (
                  <UserX size={14} />
                )}
                <span>
                  {confirmModal.targetStatus === 'pending' ? 'হ্যাঁ, পেন্ডিং করুন (Undo)' : 'হ্যাঁ, বাতিল করুন'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* WORKER DETAILS INSPECTION DRAWER                         */}
      {/* ======================================================== */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131b2e] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center font-black text-lg text-white shadow-md">
                  {selectedWorker.name?.charAt(0) || 'শ'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedWorker.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold">{selectedWorker.workerProfile?.occupation || 'দক্ষ কর্মী'}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorker(null)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block mb-1">এনআইডি নম্বর:</span>
                <span className="text-white font-mono font-bold">{selectedWorker.nidNumber || selectedWorker.workerProfile?.nidNumber || '19922692019000123'}</span>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block mb-1">বর্তমান স্ট্যাটাস:</span>
                <span className="text-emerald-400 font-bold">
                  {selectedWorker.verificationStatus === 'verified' ? 'যাচাইকৃত (Verified)' : selectedWorker.verificationStatus === 'rejected' ? 'বাতিলকৃত' : 'অপেক্ষমান (Pending)'}
                </span>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block mb-1">অবস্থান ও ঠিকানা:</span>
                <span className="text-white font-bold">{selectedWorker.workerProfile?.district ? `${translateLocation(selectedWorker.workerProfile.district)}, ${translateLocation(selectedWorker.workerProfile.division || '')}` : 'ঢাকা, বাংলাদেশ'}</span>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block mb-1">মোট কাজের অভিজ্ঞতা:</span>
                <span className="text-white font-bold">{toBengaliNumber(selectedWorker.workerProfile?.experienceYears || 5)} বছর</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs space-y-2">
              <span className="text-slate-400 font-bold block">দক্ষতা ও টেকনিক্যাল ট্রেডস:</span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedWorker.workerProfile?.skills || ['হাউস ওয়্যারিং', 'সার্কিট ব্রেকার', 'মোটর ওয়াইন্ডিং', 'আইপিএস ইনস্টলেশন']).map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedWorker(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWorkersPage;
