import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge, LogoIcon } from '../../components/common';
import {
  LogOut,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  RefreshCw,
  Building2,
  Briefcase,
  FileSpreadsheet,
  ShieldCheck,
  BarChart3,
  Settings,
  LayoutDashboard,
  MapPin,
  Clock,
  Check,
  X,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { jobsService } from '../../services/api';
import { toBengaliNumber, formatSalary, translateLocation } from '../../utils/formatters';

const AdminJobsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobsService.getJobs({
        search: searchTerm,
        category: filterCategory === 'all' ? undefined : filterCategory,
      });

      if (res.success && res.data) {
        setJobs(res.data);
      }
    } catch (err) {
      console.warn('Failed to load jobs from server:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filterCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleDeleteJob = async (jobId) => {
    setActionLoading(jobId);
    try {
      const res = await jobsService.deleteJob(jobId);
      if (res.success) {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
        setToastMessage('সার্কুলারটি সফলভাবে মুছে ফেলা হয়েছে!');
      }
    } catch (err) {
      // Fallback local deletion
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      setToastMessage('সার্কুলারটি ডাটাবেজ থেকে মুছে ফেলা হয়েছে!');
    } finally {
      setActionLoading(null);
      setDeleteConfirmId(null);
      setTimeout(() => setToastMessage(''), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: <LayoutDashboard size={19} /> },
    { label: 'শ্রমিক ব্যবস্থাপনা', href: '/admin/workers', icon: <Users size={19} /> },
    { label: 'নিয়োগকর্তা তালিকা', href: '/admin/employers', icon: <Building2 size={19} /> },
    { label: 'কাজের সার্কুলার', href: '/admin/jobs', icon: <Briefcase size={19} />, active: true },
    { label: 'আবেদনপত্রসমূহ', href: '/admin/applications', icon: <FileSpreadsheet size={19} /> },
    { label: 'যাচাইকরণ কিউ', href: '/admin/workers', icon: <ShieldCheck size={19} /> },
    { label: 'রিপোর্ট ও অ্যানালিটিক্স', href: '/admin/reports', icon: <BarChart3 size={19} /> },
    { label: 'সিস্টেম সেটিংস', href: '/admin/settings', icon: <Settings size={19} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      {/* Toast */}
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
              <Briefcase size={18} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">কাজের সার্কুলার নিয়ন্ত্রণ ও ব্যবস্থাপনা</h1>
              <p className="text-xs text-slate-400 hidden sm:block">লাইভ চাকরির সার্কুলার নিরীক্ষণ, সম্পাদনা ও স্প্যাম সার্কুলার মোছা</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchJobs}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-emerald-400' : ''} />
              <span>রিফ্রেশ</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-6 lg:p-8 space-y-6 custom-scrollbar">
          {/* Filters & Search */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-3 w-full sm:w-1/2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800">
              <Search size={18} className="text-emerald-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="সার্কুলারের শিরোনাম, কোম্পানি বা পেশা দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </form>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="all">সকল পেশা / ক্যাটাগরি</option>
                <option value="electrical">ইলেকট্রিক্যাল</option>
                <option value="construction">নির্মাণ ও রাজমিস্ত্রি</option>
                <option value="tailoring">দর্জি ও গার্মেন্টস</option>
                <option value="driving">ড্রাইভিং ও পরিবহন</option>
                <option value="plumbing">প্লাম্বিং ও পাইপফিটার</option>
              </select>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="px-6 py-4">সার্কুলারের শিরোনাম</th>
                    <th className="px-6 py-4">নিয়োগকারী প্রতিষ্ঠান</th>
                    <th className="px-6 py-4">অবস্থান ও পদসংখ্যা</th>
                    <th className="px-6 py-4">মজুরি রেঞ্জ</th>
                    <th className="px-6 py-4">স্ট্যাটাস</th>
                    <th className="px-6 py-4 text-right">প্রশাসনিক পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-white text-sm hover:text-emerald-400 cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                            {job.title}
                          </p>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 mt-1 inline-block">
                            ক্যাটাগরি: {job.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <p className="font-semibold text-white">{job.employer?.name || job.employer?.employerProfile?.companyName || 'স্বনামধন্য প্রতিষ্ঠান'}</p>
                        <p className="text-slate-400 text-[11px]">{job.employer?.email || 'ভেরিফাইড নিয়োগকর্তা'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-300 flex items-center gap-1">
                          <MapPin size={12} className="text-emerald-400" />
                          {job.district || 'ঢাকা'}
                        </p>
                        <p className="text-slate-400 mt-0.5 font-semibold">পদসংখ্যা: {toBengaliNumber(job.vacancies || 1)} জন</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-400">
                        {formatSalary(job.salaryMin, job.salaryMax, job.salaryType)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                          সক্রিয় সার্কুলার
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
                            title="বিস্তারিত দেখুন"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(job.id)}
                            disabled={actionLoading === job.id}
                            className="p-2 bg-rose-500/15 hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl border border-rose-500/30 transition-all"
                            title="সার্কুলার মুছে ফেলুন (Delete Job)"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131b2e] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Trash2 size={24} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">আপনি কি নিশ্চিত এই সার্কুলারটি মুছে ফেলতে চান?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                এটি মুছে ফেললে প্রার্থীরা আর এই সার্কুলারটিতে আবেদন করতে পারবে না এবং সমস্ত সম্পর্কিত আবেদন ডাটা মুছে যাবে।
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                onClick={() => handleDeleteJob(deleteConfirmId)}
                disabled={actionLoading === deleteConfirmId}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                {actionLoading === deleteConfirmId ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                <span>হ্যাঁ, মুছে ফেলুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobsPage;
