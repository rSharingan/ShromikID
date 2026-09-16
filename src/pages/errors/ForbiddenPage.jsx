import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import { Home, ArrowLeft, Lock } from 'lucide-react';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 font-sans">
      <div className="max-w-xl w-full text-center">
        {/* 403 Error Code */}
        <div className="mb-6">
          <div className="text-5xl mb-2">🔒</div>
          <h1 className="text-8xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
            ৪০৩
          </h1>
          <div className="mt-2 h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">প্রবেশাধিকার সংরক্ষিত</h2>
          <p className="text-sm text-slate-400 mb-1">
            এই পৃষ্ঠাটিতে প্রবেশ করার জন্য আপনার অ্যাকাউন্টের অনুমতি নেই।
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-8 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
          <p className="text-slate-300 text-xs leading-relaxed">
            যদি আপনার মনে হয় এটি একটি ত্রুটি, তবে সঠিক অ্যাকাউন্টে লগইন করুন অথবা সিস্টেম অ্যাডমিনিস্ট্রেটরের সাথে যোগাযোগ করুন।
          </p>
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

export default ForbiddenPage;
