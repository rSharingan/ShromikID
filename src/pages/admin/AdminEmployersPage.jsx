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
  RefreshCw,
  Building2,
  Briefcase,
  FileSpreadsheet,
  ShieldCheck,
  HelpCircle,
  BarChart3,
  Settings,
  LayoutDashboard,
  MapPin,
  Phone,
  Globe,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toBengaliNumber } from '../../utils/formatters';

const AdminEmployersPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [employers, setEmployers] = useState([
    {
      id: 'SHR-E-2026-000101',
      companyName: 'এবিসি কনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট লি.',
      contactPerson: 'প্রকৌশলী ফারহান চৌধুরী',
      email: 'abc@demo.shramikid.local',
      phone: '01811112233',
      industry: 'নির্মাণ ও সিভিল ইঞ্জিনিয়ারিং',
      businessType: 'প্রাইভেট লিমিটেড',
      tradeLicenseNo: 'TRAD/DSCC/019283/2024',
      district: 'ঢাকা',
      address: 'বাড়ি ৪২, রোড ১১, বনানী, ঢাকা-১২১৩',
      website: 'https://abc-construction.demo',
      employeeCount: '৫০-১০০ জন',
      activeJobs: 2,
      verificationStatus: 'verified',
      initials: 'এ',
      avatarBg: 'from-blue-600 to-indigo-800',
    },
    {
      id: 'SHR-E-2026-000102',
      companyName: 'মেঘনা এগ্রো অ্যান্ড ইন্ডাস্ট্রিয়াল মিলস',
      contactPerson: 'তানভীর হাসান',
      email: 'meghna@demo.shramikid.local',
      phone: '01922334455',
      industry: 'ম্যানুফ্যাকচারিং ও কৃষি শিল্প',
      businessType: 'কর্পোরেশন',
      tradeLicenseNo: 'TRAD/CCC/992811/2023',
      district: 'চট্টগ্রাম',
      address: 'প্লট ১৮, বিসিক শিল্প নগরী, পাহাড়তলী, চট্টগ্রাম',
      website: 'https://meghna-mills.demo',
      employeeCount: '১০০+ জন',
      activeJobs: 2,
      verificationStatus: 'verified',
      initials: 'মে',
      avatarBg: 'from-emerald-600 to-teal-800',
    },
    {
      id: 'SHR-E-2026-000103',
      companyName: 'সুরমা নিটওয়্যার অ্যান্ড টেক্সটাইল',
      contactPerson: 'আহমেদ জিয়াউদ্দিন',
      email: 'surma@demo.shramikid.local',
      phone: '01733445566',
      industry: 'তৈরি পোশাক ও টেক্সটাইল',
      businessType: 'লিমিটেড কোম্পানি',
      tradeLicenseNo: 'TRAD/SCC/445566/2024',
      district: 'সিলেট',
      address: 'জিন্দাবাজার কমার্শিয়াল জোন, সিলেট',
      website: 'https://surma-textile.demo',
      employeeCount: '২০০+ জন',
      activeJobs: 1,
      verificationStatus: 'pending',
      initials: 'সু',
      avatarBg: 'from-amber-600 to-orange-800',
    },
  ]);

  const handleVerify = (id, status) => {
    setActionLoading(id);
    setTimeout(() => {
      setEmployers((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, verificationStatus: status } : emp))
      );
      setActionLoading(null);
      setToastMessage(`প্রতিষ্ঠানের স্ট্যাটাস সফলভাবে '${status === 'verified' ? 'যাচাইকৃত' : 'স্থগিত'}' করা হয়েছে!`);
      setTimeout(() => setToastMessage(''), 4000);
    }, 500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: <LayoutDashboard size={19} /> },
    { label: 'শ্রমিক ব্যবস্থাপনা', href: '/admin/workers', icon: <Users size={19} /> },
    { label: 'নিয়োগকর্তা তালিকা', href: '/admin/employers', icon: <Building2 size={19} />, active: true },
    { label: 'কাজের সার্কুলার', href: '/jobs', icon: <Briefcase size={19} /> },
    { label: 'আবেদনপত্রসমূহ', href: '/admin/applications', icon: <FileSpreadsheet size={19} /> },
    { label: 'যাচাইকরণ কিউ', href: '/admin/workers', icon: <ShieldCheck size={19} /> },
    { label: 'রিপোর্ট ও অ্যানালিটিক্স', href: '/admin/reports', icon: <BarChart3 size={19} /> },
    { label: 'সিস্টেম সেটিংস', href: '/admin/settings', icon: <Settings size={19} /> },
  ];

  const filteredEmployers = employers.filter((emp) => {
    const matchesSearch =
      emp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.tradeLicenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = filterIndustry === 'all' || emp.industry.includes(filterIndustry);
    return matchesSearch && matchesIndustry;
  });

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
              <Building2 size={18} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">নিয়োগকর্তা ও প্রতিষ্ঠান তালিকা</h1>
              <p className="text-xs text-slate-400 hidden sm:block">নিবন্ধিত ও ভেরিফাইড নিয়োগকারী কোম্পানি ও ঠিকাদারসমূহ</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="outline"
              size="sm"
              className="text-xs rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              ড্যাশবোর্ডে ফিরুন
            </Button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19] p-6 lg:p-8 space-y-6 custom-scrollbar">
          {/* Filters and Search Bar */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3 w-full sm:w-1/2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800">
              <Search size={18} className="text-emerald-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="কোম্পানির নাম, দায়িত্বপ্রাপ্ত ব্যক্তি বা ট্রেড লাইসেন্স নম্বর দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="all">সকল শিল্প খাত</option>
                <option value="নির্মাণ">নির্মাণ ও সিভিল</option>
                <option value="ম্যানুফ্যাকচারিং">ম্যানুফ্যাকচারিং</option>
                <option value="পোশাক">তৈরি পোশাক</option>
              </select>
            </div>
          </div>

          {/* Employer Table */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="px-6 py-4">প্রতিষ্ঠান ও ট্রেড লাইসেন্স</th>
                    <th className="px-6 py-4">যোগাযোগ কর্মকর্তা</th>
                    <th className="px-6 py-4">শিল্প খাত ও অবস্থান</th>
                    <th className="px-6 py-4">সক্রিয় সার্কুলার</th>
                    <th className="px-6 py-4">ভেরিফিকেশন স্ট্যাটাস</th>
                    <th className="px-6 py-4 text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredEmployers.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${emp.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                            {emp.initials}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{emp.companyName}</p>
                            <p className="text-[11px] text-emerald-400 font-mono mt-0.5">লাইসেন্স: {emp.tradeLicenseNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <p className="font-semibold text-white">{emp.contactPerson}</p>
                        <p className="text-slate-400">{emp.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-200 font-medium">{emp.industry}</p>
                        <p className="text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} /> {emp.district}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                          {toBengaliNumber(emp.activeJobs)} টি লাইভ
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {emp.verificationStatus === 'verified' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 inline-flex items-center gap-1">
                            <CheckCircle2 size={12} /> যাচাইকৃত
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 inline-flex items-center gap-1">
                            <AlertCircle size={12} /> অপেক্ষমান
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {emp.verificationStatus !== 'verified' ? (
                            <button
                              onClick={() => handleVerify(emp.id, 'verified')}
                              disabled={actionLoading === emp.id}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1 shadow-sm transition-all"
                            >
                              <Check size={13} />
                              <span>অনুমোদন</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleVerify(emp.id, 'suspended')}
                              disabled={actionLoading === emp.id}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900/60 hover:text-rose-300 text-slate-400 rounded-xl font-bold transition-all border border-slate-700"
                            >
                              <span>স্থগিত</span>
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedEmployer(emp)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700"
                            title="বিস্তারিত প্রোফাইল"
                          >
                            <Eye size={14} />
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

      {/* Detail Modal */}
      {selectedEmployer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131b2e] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{selectedEmployer.companyName}</h3>
                  <p className="text-xs text-slate-400">{selectedEmployer.businessType}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployer(null)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">ট্রেড লাইসেন্স নম্বর:</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedEmployer.tradeLicenseNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">কর্মকর্তা:</span>
                <span className="text-white font-medium">{selectedEmployer.contactPerson}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">ফোন নম্বর:</span>
                <span className="text-white font-medium">{selectedEmployer.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">ঠিকানা:</span>
                <span className="text-white font-medium">{selectedEmployer.address}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">কর্মীর সংখ্যা:</span>
                <span className="text-white font-medium">{selectedEmployer.employeeCount}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                onClick={() => setSelectedEmployer(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs"
              >
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployersPage;
