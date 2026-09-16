import React from 'react';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Card } from '../../components/common';
import { Users, Award, Zap, Heart, ShieldCheck, Target, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-emerald-500/30">
              আমাদের লক্ষ্য ও পরিচিতি
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              শ্রমিকআইডি (ShramikID) সম্পর্কে
            </h1>
            <p className="text-base sm:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
              বাংলাদেশের ৫ কোটিরও বেশি অপ্রাতিষ্ঠানিক শ্রমজীবীকে ডিজিটাল পরিচয়, দক্ষতা স্বীকৃতি ও অর্থনৈতিক নিরাপত্তা প্রদানের জাতীয় উদ্যোগ।
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                আমাদের লক্ষ্য
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                প্রত্যেক শ্রমিকের সম্মান ও ন্যায্য অধিকার নিশ্চিত করা
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                বাংলাদেশে শ্রমশক্তির একটি বিরাট অংশ অপ্রাতিষ্ঠানিক খাতে যুক্ত—যাদের নেই কোনো আনুষ্ঠানিক পরিচয়পত্র, অভিজ্ঞতা সনদ বা কাজের চুক্তিপত্র। ফলে তারা ন্যায্য মজুরি ও সামাজিক নিরাপত্তা থেকে বঞ্চিত হন।
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                শ্রমিকআইডি প্ল্যাটফর্ম প্রতিটি কর্মীকে একটি স্বতন্ত্র ভেরিফাইড আইডি কার্ড ও ডিজিটাল স্কিল পাসপোর্ট প্রদান করে, যার মাধ্যমে মধ্যস্বত্বভোগী ছাড়াই সরাসরি নির্ভরযোগ্য কাজ পাওয়া সম্ভব হয়।
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-100/60 rounded-3xl p-8 sm:p-12 border border-emerald-200/80 text-center shadow-lg">
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Users size={40} />
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">৫.৮ কোটি+</h3>
              <p className="text-base font-bold text-emerald-800 mb-2">অপ্রাতিষ্ঠানিক শ্রমজীবী মানুষ</p>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                যাদের ডিজিটাল অন্তর্ভুক্তির মাধ্যমে জাতীয় অর্থনীতিতে সরাসরি সংযুক্ত করা হচ্ছে।
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">আমাদের আদর্শ</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">মূল নীতিমালা ও মূল্যবোধ</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart size={32} className="text-red-500" />,
                  title: 'শ্রমিকের মর্যাদা সবার আগে',
                  description: 'প্রতিটি সিদ্ধান্ত শ্রমিকের নিরাপত্তা, সম্মান ও আর্থিক স্বচ্ছতাকে সর্বোচ্চ অগ্রাধিকার দিয়ে নেওয়া হয়।',
                },
                {
                  icon: <ShieldCheck size={32} className="text-emerald-600" />,
                  title: 'বিশ্বাসযোগ্য যাচাইকরণ',
                  description: 'জাতীয় পরিচয়পত্র ও বাস্তব কাজের অভিজ্ঞতার ওপর ভিত্তি করে নিখুঁত মূল্যায়ন।',
                },
                {
                  icon: <Zap size={32} className="text-amber-500" />,
                  title: 'সহজ ও আধুনিক প্রযুক্তি',
                  description: 'বাটন ফোন থেকে শুরু করে স্মার্টফোন—সকলের জন্য সহজ ও ঝামেলাহীন ইন্টারফেস।',
                },
              ].map((value, idx) => (
                <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* National Impact */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">অর্জন</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">আমাদের বর্তমান প্রভাব</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '১২,৮০০+', label: 'নিবন্ধিত দক্ষ শ্রমিক' },
              { number: '১,২৫০+', label: 'যাচাইকৃত কোম্পানি ও ঠিকাদার' },
              { number: '৳ ২.৫ কোটি+', label: 'সরাসরি মজুরি লেনদেন' },
              { number: '৯৮%', label: 'শ্রমিক ও নিয়োগকর্তা সন্তুষ্টি' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;
