import React from 'react';
import { Link } from 'react-router-dom';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { Card, Badge, LogoIcon } from '../../components/common';
import { Award, Briefcase, MapPin, CheckCircle2, Star, Home, User, ShieldCheck, Download, Share2, QrCode } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SkillPassportPage = () => {
  const { user } = useAuth();

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/worker/dashboard', icon: <Home size={18} /> },
    { label: 'ডিজিটাল স্কিল পাসপোর্ট', href: '/worker/skill-passport', icon: <Award size={18} />, active: true },
    { label: 'আমার প্রোফাইল', href: '/worker/profile', icon: <User size={18} /> },
    { label: 'কাজের সার্কুলার খুঁজুন', href: '/jobs', icon: <Briefcase size={18} /> },
  ];

  const profile = user?.workerProfile || {};
  const userName = user?.name || 'মোঃ রহিম উদ্দিন';
  const workerId = user?.id || 'SHR-W-2026-000201';
  const occupation = profile.occupation || 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান';
  const location = profile.district ? `${profile.district}, ${profile.division || ''}` : 'মিরপুর, ঢাকা';
  const experienceYears = profile.experienceYears || 7;
  const rating = profile.rating || 4.9;
  const reviewsCount = profile.totalReviews || 28;

  const skillsList = profile.skills?.length
    ? profile.skills.map((s) => (typeof s === 'string' ? s : s.name))
    : ['৩-ফেজ ওয়্যারিং', 'ডিবি বোর্ড সেটআপ', 'সোলার ইনভার্টার ইনস্টলেশন', 'সার্কিট ব্রেকার ওয়্যারিং'];

  return (
    <WorkerLayout sidebarItems={sidebarItems}>
      <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                জাতীয় স্কিল ডাটাবেজ রেকর্ড
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ডিজিটাল স্কিল পাসপোর্ট
              </h1>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Download size={15} /> পিডিএফ ডাউনলোড
              </button>
            </div>
          </div>

          {/* Official Digital Skill Passport Card (Bento Pass) */}
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden">
            {/* Hologram Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/40">
              <ShieldCheck size={16} className="text-emerald-300" />
              <span className="text-xs font-bold text-emerald-200">জাতীয় ভেরিফাইড স্কিল</span>
            </div>

            {/* Passport Header */}
            <div className="mb-8 border-b border-emerald-800/80 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-2xl bg-emerald-800/80 border border-emerald-600/60 flex items-center justify-center text-emerald-300 shadow-md">
                  <LogoIcon size={30} variant="white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">গণপ্রজাতন্ত্রী বাংলাদেশ শ্রম কল্যাণ</h2>
                  <p className="text-xs text-emerald-300 font-medium">শ্রমিকআইডি ডিজিটাল স্কিল ভেরিফিকেশন পাসপোর্ট</p>
                </div>
              </div>
            </div>

            {/* Passport Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
              {/* Left Column: Details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-medium">
                    শ্রমিকের পূর্ণ নাম
                  </span>
                  <p className="text-2xl font-extrabold text-white">{userName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-medium">
                      অনন্য আইডি নম্বর
                    </span>
                    <p className="text-sm font-mono font-bold text-emerald-200">{workerId}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-medium">
                      প্রধান পেশা ও ট্রেড
                    </span>
                    <p className="text-sm font-bold text-white">{occupation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-medium">
                      অভিজ্ঞতার মেয়াদ
                    </span>
                    <p className="text-sm font-bold text-white">{experienceYears} বছর</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-medium">
                      কর্ম এলাকা
                    </span>
                    <p className="text-sm font-bold text-white">{location}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code verification */}
              <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
                <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center mb-2">
                  <QrCode size={80} className="text-slate-900" />
                </div>
                <span className="text-[10px] text-emerald-200 font-mono">স্ক্যান করে সততা যাচাই করুন</span>
                <span className="text-xs font-bold text-emerald-400 mt-1">✓ অফিসিয়াল রেকর্ড</span>
              </div>
            </div>

            {/* Skills & Certifications Tags */}
            <div className="pt-6 border-t border-emerald-800/80">
              <span className="text-xs font-bold text-emerald-300 block mb-3">যাচাইকৃত কারিগরি দক্ষতা সমূহ:</span>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-800/60 text-emerald-100 rounded-xl text-xs font-bold border border-emerald-700/60 flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Employer Reviews Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">নিয়োগকর্তাদের সত্যায়িত রিভিউ ও মূল্যায়ন</h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star size={16} className="fill-amber-400" />
                <span>{rating} / ৫.০ ({reviewsCount} টি মূল্যায়ন)</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-slate-900">ইঞ্জিঃ ফারহান চৌধুরী (এবিসি কনস্ট্রাকশন)</p>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "রহিম ভাই অত্যন্ত দক্ষ এবং ৩-ফেজ ইন্ডাস্ট্রিয়াল লাইনের কাজে নিখুঁত। নির্ধারিত সময়ের আগেই পুরো কাজ শেষ করেছেন।"
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-slate-900">তানভীর হাসান (মেঘনা এগ্রো মিলস)</p>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "সময়নিষ্ঠ ও সৎ কর্মী। ভবিষ্যতে যেকোনো সাবস্টেশন রক্ষণাবেক্ষণের কাজে আবার ডাকবো।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default SkillPassportPage;
