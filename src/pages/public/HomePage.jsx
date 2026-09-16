import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Card, Badge, InteractiveCardScroll } from '../../components/common';
import {
  Search,
  MapPin,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Check,
  Building2,
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সকল');
  const [selectedLocation, setSelectedLocation] = useState('');

  const categories = [
    { id: 'সকল', name: 'সকল পেশা', count: '১২,৮০০+' },
    { id: 'electrical', name: 'ইলেকট্রিশিয়ান', count: '২,৪৫০+', icon: '⚡' },
    { id: 'construction', name: 'রাজমিস্ত্রি ও নির্মাণ', count: '৩,২০০+', icon: '🧱' },
    { id: 'tailoring', name: 'দর্জি ও গার্মেন্টস', count: '১,৮৫০+', icon: '🧵' },
    { id: 'driving', name: 'ড্রাইভার ও পরিবহন', count: '২,১০০+', icon: '🚚' },
    { id: 'plumbing', name: 'প্লাম্বার ও স্যানিটারি', count: '১,৪০০+', icon: '🔧' },
    { id: 'carpentry', name: 'কাঠমিস্ত্রি', count: '৯৮০+', icon: '🪚' },
  ];

  // Bento grid showcase workers (matching the Pinterest demo aesthetic)
  const showcaseWorkers = [
    {
      id: 'SHR-W-2026-000201',
      name: 'মোঃ রহিম উদ্দিন',
      occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      location: 'মিরপুর, ঢাকা',
      rating: 4.9,
      reviews: 28,
      experience: '৭ বছর অভিজ্ঞতা',
      status: 'ভেরিফাইড স্কিল',
      dailyWage: '৳ ৯০০/দিন',
      badge: '🔥 হট স্কিল',
      skills: ['৩-ফেজ ওয়্যারিং', 'ডিবি বোর্ড সেটআপ', 'সোলার ইনভার্টার'],
      avatarBg: 'from-emerald-500 to-teal-700',
      initials: 'র',
    },
    {
      id: 'SHR-W-2026-000202',
      name: 'মোসাঃ করিমা বেগম',
      occupation: 'মাস্টার ট্রেইলার ও স্যাম্পল মেকার',
      location: 'আগ্রাবাদ, চট্টগ্রাম',
      rating: 4.8,
      reviews: 19,
      experience: '৫ বছর অভিজ্ঞতা',
      status: 'ভেরিফাইড স্কিল',
      dailyWage: '৳ ৮০০/দিন',
      badge: '⚡ শীর্ষ রেটেড',
      skills: ['প্যাটার্ন কাটিং', 'ওভারলক মেশিন', 'কোয়ালিটি ফিনিশিং'],
      avatarBg: 'from-purple-500 to-indigo-700',
      initials: 'ক',
    },
    {
      id: 'SHR-W-2026-000203',
      name: 'আবুল হোসেন',
      occupation: 'মাস্টার প্লাম্বার ও পাইপফিটার',
      location: 'জিন্দাবাজার, সিলেট',
      rating: 4.7,
      reviews: 14,
      experience: '৬ বছর অভিজ্ঞতা',
      status: 'উপলব্ধ',
      dailyWage: '৳ ৭৫০/দিন',
      badge: '✓ ইনস্ট্যান্ট বুকিং',
      skills: ['সিপিভিসি পাইপফিটিং', 'পাম্প মোটর', 'স্যানিটারি লাইন'],
      avatarBg: 'from-blue-500 to-cyan-700',
      initials: 'আ',
    },
    {
      id: 'SHR-W-2026-000204',
      name: 'মোঃ সাইফুল ইসলাম',
      occupation: 'হেভি ভেহিক্যাল ও ক্রেন ড্রাইভার',
      location: 'খুলনা সদর',
      rating: 4.9,
      reviews: 32,
      experience: '৮ বছর অভিজ্ঞতা',
      status: 'বিআরটিএ লাইসেন্সপ্রাপ্ত',
      dailyWage: '৳ ১,১০০/দিন',
      badge: '⭐ বিশ্বস্ত ড্রাইভার',
      skills: ['হেভি লাইসেন্স', 'কনটেইনার মুভিং', 'নিরাপদ ড্রাইভিং'],
      avatarBg: 'from-amber-500 to-orange-700',
      initials: 'স',
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`);
  };

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* ======================================================== */}
        {/* 1. HERO SECTION (Inspired by 2026 Modern Landing UI Demo) */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl" />
            <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-teal-300/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Pill Announcement */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold shadow-sm hover:bg-emerald-100 transition-colors">
                <Sparkles size={16} className="text-emerald-600 animate-spin" />
                <span>বাংলাদেশের প্রথম জাতীয় ডিজিটাল স্কিল পাসপোর্ট প্ল্যাটফর্ম</span>
                <span className="hidden sm:inline bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  নতুন
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                আপনার দক্ষতা। আপনার কাজ।{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  আপনার ডিজিটাল পরিচয়।
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                বাংলাদেশের ৫ কোটিরও বেশি অপ্রাতিষ্ঠানিক শ্রমজীবীদের জন্য সরাসরি কাজের সুযোগ, সরকারি স্বীকৃতি ও বিশ্বস্ত নিয়োগ ব্যবস্থা।
              </p>
            </div>

            {/* Floating Search Hub (Modern 2026 UI Bar) */}
            <div className="max-w-3xl mx-auto mb-14">
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-3 bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-full border border-slate-200 shadow-xl shadow-slate-200/60 flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="flex items-center gap-3 px-4 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-slate-100">
                  <Search size={20} className="text-emerald-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="পেশা বা কাজ খুঁজুন (যেমন: ইলেকট্রিশিয়ান, রাজমিস্ত্রি)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 px-4 py-2 w-full sm:w-1/3">
                  <MapPin size={18} className="text-slate-400 flex-shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="">সমগ্র বাংলাদেশ (সকল জেলা)</option>
                    <option value="Dhaka">ঢাকা জেলা</option>
                    <option value="Chittagong">চট্টগ্রাম জেলা</option>
                    <option value="Sylhet">সিলেট জেলা</option>
                    <option value="Khulna">খুলনা জেলা</option>
                    <option value="Rajshahi">রাজশাহী জেলা</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl sm:rounded-full text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-2 group flex-shrink-0"
                >
                  <span>কাজ খুঁজুন</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Interactive Category Pills */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  {cat.icon && <span>{cat.icon}</span>}
                  <span>{cat.name}</span>
                  <span className="text-[11px] opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* ======================================================== */}
            {/* 2. BENTO SHOWCASE GRID (Inspired by Pinterest Demo Video) */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-b from-white to-slate-100/80 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck size={16} />
                    <span>জাতীয় ডাটাবেজ দ্বারা যাচাইকৃত</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    সেরা রেটেড ও উপলব্ধ দক্ষ শ্রমিক
                  </h2>
                </div>
                <Link to="/jobs">
                  <Button variant="outline" className="rounded-full text-xs sm:text-sm font-semibold gap-2 border-slate-300">
                    <span>সকল সার্কুলার দেখুন</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>

              {/* 4-Card Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {showcaseWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badge & Status */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {worker.badge}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          <span>{worker.rating}</span>
                          <span className="text-slate-400 font-normal">({worker.reviews})</span>
                        </div>
                      </div>

                      {/* Avatar & Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${worker.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform`}
                        >
                          {worker.initials}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
                            {worker.name}
                          </h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400" />
                            {worker.location}
                          </p>
                        </div>
                      </div>

                      {/* Occupation & Experience */}
                      <div className="bg-slate-50 p-2.5 rounded-xl mb-3 border border-slate-100">
                        <p className="text-xs font-bold text-slate-800">{worker.occupation}</p>
                        <p className="text-[11px] text-slate-500">{worker.experience}</p>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {worker.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action & Wage */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">মজুরি রেট</span>
                        <span className="text-xs font-bold text-emerald-700">{worker.dailyWage}</span>
                      </div>
                      <Link to="/register/employer">
                        <button className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 rounded-lg text-xs font-bold transition-colors">
                          নিয়োগ দিন
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* INTERACTIVE CARD SCROLL (Dribbble 3D Carousel Feature)    */}
        {/* ======================================================== */}
        <InteractiveCardScroll />

        {/* ======================================================== */}
        {/* 3. CORE BENEFITS & VALUE PILLARS (Modern Bento Design)   */}
        {/* ======================================================== */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
              কেন শ্রমিকআইডি প্রয়োজন?
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              অপ্রাতিষ্ঠানিক শ্রমজীবী ও নিয়োগকর্তাদের আধুনিক সেতু
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 font-bold text-2xl">
                💳
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">ডিজিটাল স্কিল পাসপোর্ট</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                স্থায়ী কিউআর কোড এবং অনন্য আইডি (যেমন: <code>SHR-W-2026-XXXXX</code>) যা আপনার বিগত কাজের ইতিহাস ও দক্ষতার প্রমাণ হিসেবে কাজ করে।
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600" />
                  <span>জাতীয় পরিচয়পত্র ও পুলিশ ভেরিফিকেশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600" />
                  <span>সার্টিফিকেট ও কারিগরি প্রশিক্ষণ রেকর্ড</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 font-bold text-2xl">
                🤝
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">দালালমুক্ত সরাসরি নিয়োগ</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                কোনো মধ্যস্বত্বভোগী বা দালালের কমিশন ছাড়াই ঠিকাদার, প্রতিষ্ঠান ও গৃহমালিকদের সাথে সরাসরি যোগাযোগ এবং ন্যায্য পারিশ্রমিক নিশ্চিতকরণ।
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-blue-600" />
                  <span>ন্যায্য দৈনিক ও মাসিক বাজার মজুরি</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-blue-600" />
                  <span>সরাসরি বিকাশ/নগদে মজুরি প্রদান</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 font-bold text-2xl">
                🛡️
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">সামাজিক নিরাপত্তা ও কল্যাণ</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                কর্মক্ষেত্রে দুর্ঘটনা বীমা, জরুরি চিকিৎসা ভাতা এবং শ্রমিক কল্যাণ তহবিলের সুযোগ সুবিধা যা শ্রমিকের পরিবারকে নিরাপত্তা দেয়।
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-amber-600" />
                  <span>জরুরি চিকিৎসা অনুদান সহায়তা</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-amber-600" />
                  <span>বিনামূল্যে সরকারি স্কিল ট্রেনিং সুবিধা</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. PLATFORM STATISTICS                                   */}
        {/* ======================================================== */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-400">১২,৮০০+</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">নিবন্ধিত ও ভেরিফাইড শ্রমিক</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-400">১,২৫০+</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">অনুমোদিত কোম্পানি ও নিয়োগকর্তা</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400">৫,৪০০+</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">সরাসরি কাজ সম্পন্ন</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-400">৯৮%</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">শ্রমিক সন্তুষ্টি রেটিং</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. HOW IT WORKS (3 Simple Steps)                         */}
        {/* ======================================================== */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">সহজ পদ্ধতি</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              কীভাবে ৩ ধাপে শুরু করবেন?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto">
                ১
              </div>
              <h4 className="text-lg font-bold text-slate-900">আইডি তৈরি করুন</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                আপনার নাম, ফোন নম্বর, পেশা এবং দক্ষতা দিয়ে বিনামূল্যে মাত্র ২ মিনিটে রেজিস্ট্রেশন করুন।
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto">
                ২
              </div>
              <h4 className="text-lg font-bold text-slate-900">ভেরিফিকেশন সম্পন্ন করুন</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                জাতীয় পরিচয়পত্র ও অভিজ্ঞতার তথ্যের ভিত্তিতে আপনার প্রোফাইল ভেরিফাইড সিল পাবে।
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto">
                ৩
              </div>
              <h4 className="text-lg font-bold text-slate-900">কাজের সুযোগ নিন</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                সরাসরি বিভিন্ন কোম্পানি ও ঠিকাদারদের চাকরির সার্কুলারে ১-ক্লিকে আবেদন করুন।
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. CALL TO ACTION (Worker & Employer Split)              */}
        {/* ======================================================== */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Worker CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-2xl border border-emerald-400/30 group">
              {/* Glow decorative effect */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-400/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-100 border border-white/25 shadow-sm">
                  <Sparkles size={14} className="text-amber-300" />
                  <span>শ্রমিকদের জন্য</span>
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                  আজই আপনার ডিজিটাল <span className="text-amber-300 drop-shadow-sm">স্কিল পাসপোর্ট</span> তৈরি করুন
                </h3>
                <p className="text-emerald-50 text-sm sm:text-base leading-relaxed font-normal">
                  আপনার কাজের অভিজ্ঞতা ও দক্ষতা প্রমাণ করুন, জাতীয় ডাটাবেজে যুক্ত হোন এবং সরাসরি মর্যাদাপূর্ণ কাজের সুযোগ পান। সম্পূর্ণ ফ্রি রেজিস্ট্রেশন।
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link to="/register/worker" className="inline-block w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-950 font-black rounded-2xl text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group-hover:ring-4 group-hover:ring-white/20">
                    <span>শ্রমিক হিসেবে যুক্ত হোন</span>
                    <ArrowRight size={18} className="text-emerald-700" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Employer CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-2xl border border-slate-700/80 group">
              {/* Glow decorative effect */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-300 border border-emerald-500/40 shadow-sm">
                  <Building2 size={14} className="text-emerald-400" />
                  <span>নিয়োগকর্তাদের জন্য</span>
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                  আপনার প্রজেক্টের জন্য <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">যাচাইকৃত কর্মী</span> নিয়োগ দিন
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  নির্ভরযোগ্য, পুলিশ ভেরিফাইড ও দক্ষ কারিগরি পেশাদার খুঁজে নিন খুব সহজে। সরাসরি সার্কুলার পোস্ট করুন সম্পূর্ণ বিনামূল্যে।
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link to="/register/employer" className="inline-block w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black rounded-2xl text-base shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group-hover:ring-4 group-hover:ring-emerald-500/30">
                    <span>নিয়োগকর্তা অ্যাকাউন্ট খুলুন</span>
                    <ArrowRight size={18} className="text-white" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default HomePage;
