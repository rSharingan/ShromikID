import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button } from '../../components/common';
import { CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Briefcase, Award, Zap } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white py-16 sm:py-24 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-emerald-500/30">
              নির্দেশিকা
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              শ্রমিকআইডি কীভাবে কাজ করে?
            </h1>
            <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
              সহজ ও স্বচ্ছ ৩ ধাপে আপনার ডিজিটাল স্কিল পাসপোর্ট তৈরি করুন এবং কাজের জগতে এগিয়ে থাকুন।
            </p>
          </div>
        </section>

        {/* For Workers Steps */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">শ্রমিকদের জন্য নির্দেশিকা</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">শ্রমিক হিসেবে রেজিস্ট্রেশন ও কাজের ধাপ</h2>
          </div>

          <div className="space-y-6 mb-16">
            {[
              {
                step: '১',
                title: 'বিনামূল্যে অ্যাকাউন্ট ও প্রোফাইল তৈরি',
                description: 'আপনার মোবাইল নম্বর বা ইমেইল এবং নাম দিয়ে অ্যাকাউন্ট খুলুন।',
                details: ['মোবাইল নম্বর যাচাই (OTP)', 'মৌলিক তথ্য পূরণ', 'পাসওয়ার্ড সেটআপ'],
              },
              {
                step: '২',
                title: 'দক্ষতা ও পরিচয় যাচাইকরণ (NID Verification)',
                description: 'জাতীয় পরিচয়পত্র ও আপনার পেশার কাজের তথ্য দিয়ে প্রোফাইল ভেরিফাই করুন।',
                details: ['এনআইডি নম্বর সংযোজন', 'পেশা নির্বাচন', 'ভেরিফাইড ব্যাজ লাভ'],
              },
              {
                step: '৩',
                title: 'ডিজিটাল স্কিল পাসপোর্ট তৈরি',
                description: 'আপনার দক্ষতা, অতীত কাজের অভিজ্ঞতা এবং প্রশিক্ষণ সনদ যুক্ত করুন।',
                details: ['কাজের ইতিহাস যোগ', 'ট্রেনিং সার্টিফিকেট', 'অনন্য আইডি কোড প্রাপ্তি'],
              },
              {
                step: '৪',
                title: 'কাজের সার্কুলারে ১-ক্লিকে আবেদন',
                description: 'আপনার জেলা বা পছন্দের স্থানে বিভিন্ন কাজের সার্কুলার দেখুন ও সরাসরি আবেদন করুন।',
                details: ['লোকেশন ফিল্টার', 'ন্যায্য মজুরি নির্বাচন', 'সরাসরি যোগাযোগ'],
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold text-xl flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.details.map((detail, didx) => (
                      <span
                        key={didx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-700 text-xs font-semibold rounded-full border border-slate-100"
                      >
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/register/worker">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg shadow-emerald-600/30">
                এখনই শ্রমিক প্রোফাইল তৈরি করুন
              </Button>
            </Link>
          </div>
        </section>

        {/* For Employers Section */}
        <section className="bg-slate-900 text-white py-16 sm:py-20 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">নিয়োগকর্তাদের জন্য</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">কর্মী নিয়োগের সহজ পদ্ধতি</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700">
                <span className="text-emerald-400 font-extrabold text-lg block mb-2">ধাপ ১</span>
                <h4 className="font-bold text-lg mb-2">প্রতিষ্ঠান নিবন্ধন</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  কোম্পানির নাম, ট্রেড লাইসেন্স ও ব্যবসার তথ্য দিয়ে নিয়োগকর্তা অ্যাকাউন্ট খুলুন।
                </p>
              </div>

              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700">
                <span className="text-emerald-400 font-extrabold text-lg block mb-2">ধাপ ২</span>
                <h4 className="font-bold text-lg mb-2">কাজের সার্কুলার পোস্ট</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  প্রয়োজনীয় পদের নাম, মজুরি, লোকেশন ও দক্ষতার বিবরণ দিয়ে সার্কুলার প্রকাশ করুন।
                </p>
              </div>

              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700">
                <span className="text-emerald-400 font-extrabold text-lg block mb-2">ধাপ ৩</span>
                <h4 className="font-bold text-lg mb-2">যাচাইকৃত কর্মী নিয়োগ</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  আবেদনকারীদের স্কিল পাসপোর্ট পর্যালোচনা করুন এবং সরাসরি ফোনে বা চ্যাটে যোগাযোগ করে চূড়ান্ত করুন।
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/register/employer">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-lg shadow-emerald-500/30">
                  নিয়োগকর্তা হিসেবে শুরু করুন
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default HowItWorksPage;
