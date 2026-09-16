import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Star,
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  Briefcase,
  Sparkles,
  Phone,
  Eye,
  ExternalLink,
  Play,
  Pause,
  Layers,
} from 'lucide-react';
import { LogoIcon } from './Logo';
import Badge from './Badge';
import Button from './Button';

/**
 * 3D Interactive Card Component with Mouse Tracking Tilt & Gloss Reflection
 */
const InteractiveTiltCard = ({ worker, isActive, isExpanded, onToggleExpand, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt from center (-15deg to +15deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    // Calculate glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-[320px] sm:w-[360px] flex-shrink-0 rounded-[32px] p-6 sm:p-7 select-none transition-all duration-500 ${
        worker.themeBg || 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white'
      } ${
        isActive
          ? 'shadow-2xl shadow-emerald-950/40 ring-2 ring-emerald-400/50'
          : 'opacity-90 hover:opacity-100 shadow-xl border border-slate-700/50'
      }`}
    >
      {/* Holographic Gloss Reflection Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
        }}
      />

      {/* Card Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black text-xl shadow-md">
            {worker.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-lg text-white leading-tight">{worker.name}</h3>
              <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
            </div>
            <p className="text-xs text-emerald-300/90 font-medium mt-0.5">{worker.occupation}</p>
          </div>
        </div>

        {/* Interactive Expand "+" Button (Abron Signature Motion) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand(worker.id);
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isExpanded
              ? 'bg-rose-500 text-white rotate-45 shadow-lg shadow-rose-500/30'
              : 'bg-white/15 hover:bg-white/25 text-white hover:scale-110 shadow-sm border border-white/20'
          }`}
          title={isExpanded ? 'সংক্ষেপ করুন' : 'বিস্তারিত দেখুন'}
        >
          <Plus size={18} className="transition-transform" />
        </button>
      </div>

      {/* Card Body / Main Metrics */}
      <div className="space-y-3.5 relative z-10 mb-5">
        <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-emerald-400" />
            <span>{worker.location}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>{worker.rating}</span>
            <span className="text-slate-400 font-normal">({worker.reviews})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl">
            <p className="text-[10px] text-slate-400 mb-0.5 font-medium">অভিজ্ঞতা</p>
            <p className="font-bold text-white text-sm">{worker.experience}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl">
            <p className="text-[10px] text-slate-400 mb-0.5 font-medium">প্রত্যাশিত মজুরি</p>
            <p className="font-bold text-emerald-300 text-sm">{worker.dailyWage}</p>
          </div>
        </div>

        {/* Skill Tags */}
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">যাচাইকৃত শীর্ষ দক্ষতা</p>
          <div className="flex flex-wrap gap-1.5">
            {worker.skills.map((skill, sidx) => (
              <span
                key={sidx}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable Interactive Drawer (Unfolds on "+" click) */}
      {isExpanded && (
        <div className="pt-4 border-t border-white/15 animate-slideDown space-y-3 relative z-10">
          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>এনআইডি ভেরিফিকেশন:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> ১০০% ম্যাচ
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>সার্টিফিকেট প্রদানকারী:</span>
              <span className="text-white font-medium">{worker.certificateIssuer || 'বিটিইবি / এনএসডিএ'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>সম্পন্ন কাজের সংখ্যা:</span>
              <span className="text-amber-300 font-bold">{worker.completedJobs || '৪৫+ টি প্রজেক্ট'}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/jobs`} className="flex-1">
              <Button
                fullWidth
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs py-2.5 shadow-lg shadow-emerald-600/30"
              >
                সরাসরি কাজ অফার করুন
              </Button>
            </Link>
            <Link to={`/worker/skill-passport`} className="w-10 flex-shrink-0">
              <button className="w-full h-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white transition-colors" title="স্কিল পাসপোর্ট দেখুন">
                <Eye size={16} />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Card Footer */}
      {!isExpanded && (
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <Sparkles size={12} /> {worker.badge}
          </span>
          <span className="text-[11px] text-slate-400">বিস্তারিত দেখতে + চাপুন</span>
        </div>
      )}
    </div>
  );
};

/**
 * Main Interactive Card Scroll Section (Abron Studio Dribbble Inspiration)
 */
const InteractiveCardScroll = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Rich showcase data for interactive card scroll
  const workersData = [
    {
      id: 'SHR-01',
      name: 'মোঃ রহিম উদ্দিন',
      occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
      category: 'electrical',
      location: 'মিরপুর, ঢাকা',
      rating: 4.9,
      reviews: 28,
      experience: '৭ বছর অভিজ্ঞতা',
      dailyWage: '৳ ৯০০ / দিন',
      badge: '🔥 টপ রেটেড এক্সপার্ট',
      skills: ['৩-ফেজ ওয়্যারিং', 'ডিবি বোর্ড সেটআপ', 'সোলার ইনভার্টার'],
      initials: 'র',
      themeBg: 'bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white',
      certificateIssuer: 'কারিগরি শিক্ষা বোর্ড (BTEB)',
      completedJobs: '৪৮ টি সফল কাজ',
    },
    {
      id: 'SHR-02',
      name: 'মোসাঃ করিমা বেগম',
      occupation: 'মাস্টার টেইলার ও প্যাটার্ন ডিজাইনার',
      category: 'tailoring',
      location: 'আগ্রাবাদ, চট্টগ্রাম',
      rating: 4.8,
      reviews: 19,
      experience: '৫ বছর অভিজ্ঞতা',
      dailyWage: '৳ ৮০০ / দিন',
      badge: '⚡ গোল্ড স্কিল পাসপোর্ট',
      skills: ['প্যাটার্ন কাটিং', 'ওভারলক মেশিন', 'কোয়ালিটি ফিনিশিং'],
      initials: 'ক',
      themeBg: 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white',
      certificateIssuer: 'বিজিএমইএ ফ্যাশন ইনস্টিটিউট',
      completedJobs: '৩৪ টি এক্সপোর্ট অর্ডার',
    },
    {
      id: 'SHR-03',
      name: 'আবুল হোসেন',
      occupation: 'মাস্টার প্লাম্বার ও হাইড্রো পাইপফিটার',
      category: 'plumbing',
      location: 'জিন্দাবাজার, সিলেট',
      rating: 4.7,
      reviews: 14,
      experience: '৬ বছর অভিজ্ঞতা',
      dailyWage: '৳ ৭৫০ / দিন',
      badge: '✓ ইনস্ট্যান্ট বুকিং',
      skills: ['সিপিভিসি পাইপফিটিং', 'পাম্প মোটর', 'স্যানিটারি লাইন'],
      initials: 'আ',
      themeBg: 'bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white',
      certificateIssuer: 'ইউসেপ বাংলাদেশ (UCEP)',
      completedJobs: '২৯ টি রেসিডেন্সিয়াল কাজ',
    },
    {
      id: 'SHR-04',
      name: 'মোঃ সাইফুল ইসলাম',
      occupation: 'হেভি ভেহিকেল ড্রাইভার ও ক্রেন অপারেটর',
      category: 'driving',
      location: 'পাহাড়তলী, চট্টগ্রাম',
      rating: 4.9,
      reviews: 32,
      experience: '৮ বছর অভিজ্ঞতা',
      dailyWage: '৳ ১,১০০ / দিন',
      badge: '⭐ বিআরটিএ প্রফেশনাল',
      skills: ['হেভি ট্রাক চালনা', 'কন্টেইনার ক্রেন', 'লজিস্টিক নেভিগেশন'],
      initials: 'স',
      themeBg: 'bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 text-white',
      certificateIssuer: 'বিআরটিএ হেভি ভেহিকেল লাইসেন্স',
      completedJobs: '১২০+ ট্রিপ সম্পন্ন',
    },
    {
      id: 'SHR-05',
      name: 'তানভীর আহমেদ',
      occupation: 'সিভিল রাজমিস্ত্রি ও টাইলস স্পেশালিস্ট',
      category: 'construction',
      location: 'উত্তরা, ঢাকা',
      rating: 4.8,
      reviews: 23,
      experience: '৬ বছর অভিজ্ঞতা',
      dailyWage: '৳ ৮৫০ / দিন',
      badge: '🧱 প্রিমিয়াম ফিনিশার',
      skills: ['মার্বেল টাইলস', 'লেজার লেভেলিং', 'স্ট্রাকচারাল প্লাস্টার'],
      initials: 'ত',
      themeBg: 'bg-gradient-to-br from-rose-950 via-slate-900 to-stone-900 text-white',
      certificateIssuer: 'জাতীয় দক্ষতা কর্তৃপক্ষ (NSDA)',
      completedJobs: '৪২ টি প্রজেক্ট সম্পন্ন',
    },
    {
      id: 'SHR-06',
      name: 'আকরাম হোসেন',
      occupation: 'কাঠমিস্ত্রি ও ইন্টেরিয়র ফার্নিচার ক্রাফটার',
      category: 'carpentry',
      location: 'সোনাডাঙ্গা, খুলনা',
      rating: 4.6,
      reviews: 16,
      experience: '৫ বছর অভিজ্ঞতা',
      dailyWage: '৳ ৮০০ / দিন',
      badge: '🪚 ফার্নিচার স্পেশালিস্ট',
      skills: ['মডুলার কিচেন', 'সিএনসি উড কাটিং', 'ডোর ফিটিং'],
      initials: 'আ',
      themeBg: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white',
      certificateIssuer: 'খুলনা টেকনিক্যাল সেন্টার',
      completedJobs: '২৬ টি কাস্টম ফার্নিচার',
    },
  ];

  const filterTabs = [
    { id: 'all', label: 'সকল ক্যাটাগরি' },
    { id: 'electrical', label: 'ইলেকট্রিক্যাল' },
    { id: 'construction', label: 'রাজমিস্ত্রি ও নির্মাণ' },
    { id: 'tailoring', label: 'দর্জি ও গার্মেন্টস' },
    { id: 'driving', label: 'হেভি ড্রাইভার' },
    { id: 'plumbing', label: 'প্লাম্বিং' },
  ];

  const filteredWorkers = selectedFilter === 'all'
    ? workersData
    : workersData.filter(w => w.category === selectedFilter);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isDragging || expandedCardId) return;

    const interval = setInterval(() => {
      scrollToNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlay, activeIndex, filteredWorkers.length, isDragging, expandedCardId]);

  const scrollToNext = () => {
    if (!scrollContainerRef.current) return;
    const nextIdx = (activeIndex + 1) % filteredWorkers.length;
    scrollToIndex(nextIdx);
  };

  const scrollToPrev = () => {
    if (!scrollContainerRef.current) return;
    const prevIdx = activeIndex === 0 ? filteredWorkers.length - 1 : activeIndex - 1;
    scrollToIndex(prevIdx);
  };

  const scrollToIndex = (idx) => {
    if (!scrollContainerRef.current) return;
    setActiveIndex(idx);
    const container = scrollContainerRef.current;
    const cardWidth = 360 + 24; // width + gap
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleToggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  // Drag to scroll handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Track scroll position for active pill update
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 360 + 24;
    const currentIdx = Math.round(container.scrollLeft / cardWidth);
    if (currentIdx !== activeIndex && currentIdx >= 0 && currentIdx < filteredWorkers.length) {
      setActiveIndex(currentIdx);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-bold mb-3">
              <Sparkles size={14} className="animate-spin" />
              <span>ইন্টারঅ্যাক্টিভ ৩ডি কার্ড শোকেস</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              স্মার্ট শ্রমিক আইডি ও{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                স্কিল পাসপোর্ট প্রিভিউ
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              কার্ডে কার্সার ঘুরিয়ে ৩ডি টিল্ট এফেক্ট দেখুন অথবা <span className="text-emerald-400 font-bold">+</span> চিহ্নে ক্লিক করে তাৎক্ষণিক এনআইডি ও ভেরিফিকেশন তথ্য দেখুন।
            </p>
          </div>

          {/* Navigation Controls & Auto-play Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2.5 rounded-2xl border transition-all ${
                isAutoPlay
                  ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={isAutoPlay ? 'অটো-স্ক্রোল বন্ধ করুন' : 'অটো-স্ক্রোল চালু করুন'}
            >
              {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={scrollToPrev}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white hover:border-emerald-500 transition-all shadow-md active:scale-95"
              aria-label="পূর্ববর্তী কার্ড"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={scrollToNext}
              className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-900/40 active:scale-95"
              aria-label="পরবর্তী কার্ড"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFilter(tab.id);
                setActiveIndex(0);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                selectedFilter === tab.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/50 scale-105'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Interactive Card Scroll Track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredWorkers.map((worker, idx) => (
            <div key={worker.id} className="snap-center">
              <InteractiveTiltCard
                worker={worker}
                index={idx}
                isActive={idx === activeIndex}
                isExpanded={expandedCardId === worker.id}
                onToggleExpand={handleToggleExpand}
              />
            </div>
          ))}
        </div>

        {/* Progress Bar & Slide Index Counter */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {filteredWorkers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-emerald-500 shadow-md shadow-emerald-500/50'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`কার্ড ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            কার্ড <span className="text-white font-bold">{activeIndex + 1}</span> / {filteredWorkers.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCardScroll;
