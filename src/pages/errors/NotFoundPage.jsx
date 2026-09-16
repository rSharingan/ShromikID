import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 font-sans">
      <div className="max-w-xl w-full text-center">
        {/* 404 Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600 bg-clip-text text-transparent">
            ৪০৪
          </h1>
          <div className="mt-2 h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
          <p className="text-sm text-slate-400 mb-1">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="mb-8 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
          <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">দ্রুত নেভিগেশন</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
            <button
              onClick={() => navigate('/')}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 transition-colors"
            >
              🏠 হোমপেজ
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 transition-colors"
            >
              💼 সার্কুলার
            </button>
            <button
              onClick={() => navigate('/login')}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 transition-colors"
            >
              🔐 লগইন
            </button>
            <button
              onClick={() => navigate('/register')}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 transition-colors"
            >
              ✍️ নিবন্ধন
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 rounded-full font-bold text-xs gap-2"
          >
            <ArrowLeft size={16} />
            পূর্বের পৃষ্ঠায় ফিরে যান
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs gap-2"
          >
            <Home size={16} />
            মূল পাতায় যান
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-slate-500 text-xs">
            শ্রমিক আইডি (ShramikID) • <span className="text-slate-600">জাতীয় ডিজিটাল ওয়ার্কার আইডেন্টিটি প্ল্যাটফর্ম</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
