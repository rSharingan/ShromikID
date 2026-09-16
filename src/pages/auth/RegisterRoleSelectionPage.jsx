import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Card, Button } from '../../components/common';
import { UserCheck, Briefcase, Shield, ArrowRight } from 'lucide-react';

const RegisterRoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
              নতুন অ্যাকাউন্ট নিবন্ধন
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              শ্রমিকআইডিতে আপনাকে স্বাগতম
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-xl mx-auto">
              আপনি কীভাবে শ্রমিকআইডি প্ল্যাটফর্ম ব্যবহার করতে চান তা নির্বাচন করুন
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {/* Worker Card */}
            <div
              onClick={() => navigate('/register/worker')}
              className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UserCheck size={36} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">শ্রমিক</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    আপনার ডিজিটাল স্কিল পাসপোর্ট তৈরি করুন এবং সরাসরি কাজের সুযোগ পান।
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2 text-left bg-slate-50 p-4 rounded-2xl">
                  <div>✓ ডিজিটাল স্কিল পাসপোর্ট</div>
                  <div>✓ সরাসরি কাজের সার্কুলার</div>
                  <div>✓ দক্ষতা ও প্রশিক্ষণ সনদ</div>
                  <div>✓ কল্যাণ ও বীমা সুবিধা</div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  fullWidth
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25"
                >
                  শ্রমিক রেজিস্ট্রেশন
                </Button>
              </div>
            </div>

            {/* Employer Card */}
            <div
              onClick={() => navigate('/register/employer')}
              className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Briefcase size={36} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">নিয়োগকর্তা</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    যাচাইকৃত দক্ষ কর্মী খুঁজে নিন এবং কাজের সার্কুলার পোস্ট করুন।
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2 text-left bg-slate-50 p-4 rounded-2xl">
                  <div>✓ যাচাইকৃত কর্মী ডাটাবেজ</div>
                  <div>✓ সরাসরি কাজের পোস্ট</div>
                  <div>✓ সহজ আবেদন ব্যবস্থাপনা</div>
                  <div>✓ ভেরিফাইড কোম্পানি প্রোফাইল</div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  fullWidth
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25"
                >
                  নিয়োগকর্তা রেজিস্ট্রেশন
                </Button>
              </div>
            </div>

            {/* Admin Card */}
            <div
              onClick={() => navigate('/login')}
              className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Shield size={36} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">অ্যাডমিন</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    প্ল্যাটফর্ম পর্যবেক্ষণ, এনআইডি ও শ্রমিক ভেরিফিকেশন পরিচালনা।
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2 text-left bg-slate-50 p-4 rounded-2xl">
                  <div>✓ সেন্ট্রাল ড্যাশবোর্ড</div>
                  <div>✓ ভেরিফিকেশন কিউ</div>
                  <div>✓ অভিযোগ ও রিভিউ নিয়ন্ত্রণ</div>
                  <div>✓ সামগ্রিক পরিসংখ্যান</div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="outline"
                  fullWidth
                  className="border-slate-400 font-bold rounded-xl text-slate-800"
                >
                  অ্যাডমিন লগইন
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-slate-600">
            ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link to="/login" className="text-emerald-700 font-bold hover:underline">
              এখানে লগইন করুন
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterRoleSelectionPage;
