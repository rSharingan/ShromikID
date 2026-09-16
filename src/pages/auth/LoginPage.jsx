import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Input, Card } from '../../components/common';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Briefcase,
  Shield,
  AlertCircle,
  Phone,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';
import { toBengaliNumber, toAsciiNumber } from '../../utils/formatters';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithOtp, demoAccounts } = useAuth();
  const [userType, setUserType] = useState(null);

  // Standard Password Login State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Worker OTP Login State
  const [workerLoginMethod, setWorkerLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [otpPhone, setOtpPhone] = useState('01700000001');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [demoOtpCode, setDemoOtpCode] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');
  const otpInputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCountdown]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!identifier || !password) {
      setError('অনুগ্রহ করে মোবাইল/ইমেইল এবং পাসওয়ার্ড পূরণ করুন।');
      setLoading(false);
      return;
    }

    try {
      const result = await login(identifier, password, userType);
      if (result.success) {
        if (userType === 'worker' || result.user?.role === 'worker') {
          navigate('/worker/dashboard');
        } else if (userType === 'employer' || result.user?.role === 'employer') {
          navigate('/employer/dashboard');
        } else if (userType === 'admin' || result.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(result.message || 'ভুল তথ্য প্রদান করা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      setError(err.message || 'লগইন করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const handleSendWorkerOtp = async () => {
    if (!otpPhone.trim()) {
      setError('অনুগ্রহ করে আপনার নিবন্ধিত মোবাইল নম্বর লিখুন।');
      return;
    }

    setError('');
    setOtpSuccessMsg('');
    setOtpSending(true);

    try {
      const res = await authService.sendOtp(otpPhone, 'LOGIN');
      if (res.success) {
        setOtpSent(true);
        setOtpCountdown(120);
        if (res.demoOtp) {
          setDemoOtpCode(res.demoOtp);
        }
        setOtpSuccessMsg(res.message || 'আপনার মোবাইলে ৬-সংখ্যার লগইন কোড পাঠানো হয়েছে।');
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        setError(res.message || 'ওটিপি কোড পাঠাতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      setError(err.message || 'ওটিপি কোড পাঠানো যায়নি। নম্বরটি সঠিক কিনা পরীক্ষা করুন।');
    } finally {
      setOtpSending(false);
    }
  };

  const handleOtpDigitChange = (index, value) => {
    const asciiVal = toAsciiNumber(value);
    if (asciiVal.length > 1) {
      const digits = asciiVal.slice(0, 6).split('');
      const newOtp = [...otpDigits];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtpDigits(newOtp);
      const nextIdx = Math.min(digits.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    const singleDigit = asciiVal.slice(-1);
    if (singleDigit && !/^\d$/.test(singleDigit)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = singleDigit;
    setOtpDigits(newOtp);
    setError('');

    if (singleDigit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillWorkerDemoOtp = () => {
    if (!demoOtpCode) return;
    const digits = demoOtpCode.split('');
    setOtpDigits(digits);
    setError('');
    otpInputRefs.current[5]?.focus();
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setError('অনুগ্রহ করে ৬-সংখ্যার সম্পূর্ণ ওটিপি কোড লিখুন।');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await loginWithOtp(otpPhone, fullOtp, 'worker');
      if (result.success) {
        navigate('/worker/dashboard');
      } else {
        setError(result.message || 'ভুল ওটিপি কোড। পুনরায় চেষ্টা করুন।');
      }
    } catch (err) {
      setError(err.message || 'ওটিপি যাচাই করে লগইন করা যায়নি।');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'worker') {
      setIdentifier(demoAccounts.worker.phone || demoAccounts.worker.email);
      setPassword(demoAccounts.worker.password);
      setOtpPhone(demoAccounts.worker.phone);
    } else if (role === 'employer') {
      setIdentifier(demoAccounts.employer.email);
      setPassword(demoAccounts.employer.password);
    } else if (role === 'admin') {
      setIdentifier(demoAccounts.admin.email);
      setPassword(demoAccounts.admin.password);
    }
  };

  // Role Selection Screen
  if (!userType) {
    return (
      <PublicLayout>
        <div className="bg-slate-50 min-h-screen py-12 sm:py-16 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
                নিরাপদ লগইন
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                আপনার অ্যাকাউন্টের ধরন বেছে নিন
              </h1>
              <p className="text-sm text-slate-600 mt-2">
                ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে আপনার ভূমিকা নির্বাচন করুন
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Worker Card */}
              <div
                onClick={() => {
                  setUserType('worker');
                  fillDemoCredentials('worker');
                }}
                className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <UserCheck size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">শ্রমিক</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    সরাসরি মোবাইল OTP বা পাসওয়ার্ড দিয়ে দ্রুত ড্যাশবোর্ডে লগইন করুন
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                    শ্রমিক হিসেবে প্রবেশ →
                  </span>
                </div>
              </div>

              {/* Employer Card */}
              <div
                onClick={() => {
                  setUserType('employer');
                  fillDemoCredentials('employer');
                }}
                className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">নিয়োগকর্তা</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    কাজের বিজ্ঞপ্তি পোস্ট করতে এবং যাচাইকৃত দক্ষ শ্রমিক খুঁজে নিয়োগ দিতে
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-blue-600 group-hover:underline">
                    নিয়োগকর্তা হিসেবে প্রবেশ →
                  </span>
                </div>
              </div>

              {/* Admin Card */}
              <div
                onClick={() => {
                  setUserType('admin');
                  fillDemoCredentials('admin');
                }}
                className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">অ্যাডমিন</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    এনআইডি ভেরিফিকেশন, রিপোর্ট ও প্ল্যাটফর্ম প্রশাসন পরিচালনা করতে
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 group-hover:underline">
                    অ্যাডমিন প্যানেল →
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500">
              অ্যাকাউন্ট নেই?{' '}
              <Link to="/register" className="font-bold text-emerald-600 hover:underline">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </Link>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const roleTitle = userType === 'worker' ? 'শ্রমিক লগইন' : userType === 'employer' ? 'নিয়োগকর্তা লগইন' : 'অ্যাডমিন লগইন';

  const minutes = Math.floor(otpCountdown / 60);
  const seconds = otpCountdown % 60;
  const formattedCountdown = `${toBengaliNumber(String(minutes).padStart(2, '0'))}:${toBengaliNumber(String(seconds).padStart(2, '0'))}`;

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full">
          {/* Back to Role Selection */}
          <button
            onClick={() => {
              setUserType(null);
              setError('');
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6"
          >
            <ArrowLeft size={16} /> ভূমিকা পরিবর্তন করুন
          </button>

          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl bg-white">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                {roleTitle}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                আপনার অ্যাকাউন্টে প্রবেশ করুন
              </h2>
            </div>

            {/* Worker Login Mode Tabs */}
            {userType === 'worker' && (
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setWorkerLoginMethod('otp');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    workerLoginMethod === 'otp'
                      ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone size={14} />
                  <span>মোবাইল OTP দিয়ে লগইন</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWorkerLoginMethod('password');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    workerLoginMethod === 'password'
                      ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound size={14} />
                  <span>পাসওয়ার্ড দিয়ে</span>
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {otpSuccessMsg && !error && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" />
                <span>{otpSuccessMsg}</span>
              </div>
            )}

            {/* Worker OTP Login Flow */}
            {userType === 'worker' && workerLoginMethod === 'otp' ? (
              <form onSubmit={handleOtpLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    নিবন্ধিত মোবাইল নম্বর
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-3 text-slate-400" size={16} />
                      <input
                        type="text"
                        placeholder="যেমন: 01700000001"
                        value={otpPhone}
                        onChange={(e) => {
                          setOtpPhone(e.target.value);
                          setOtpSent(false);
                          setOtpDigits(['', '', '', '', '', '']);
                        }}
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleSendWorkerOtp}
                      loading={otpSending}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs px-3.5 whitespace-nowrap flex items-center gap-1 shadow-sm"
                    >
                      <Smartphone size={14} />
                      <span>{otpSent ? 'পুনরায় পাঠান' : 'ওটিপি পাঠান'}</span>
                    </Button>
                  </div>
                </div>

                {/* 6-digit OTP code entry when sent */}
                {otpSent && (
                  <div className="pt-2 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700">
                        মোবাইলে আসা ৬-সংখ্যার কোডটি লিখুন
                      </label>
                      {otpCountdown > 0 && (
                        <span className="text-[11px] font-mono font-bold text-emerald-700">
                          {formattedCountdown}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between gap-2 mb-3">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpInputRefs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={digit ? toBengaliNumber(digit) : ''}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-11 h-12 text-center text-lg font-extrabold text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                        />
                      ))}
                    </div>

                    {/* Demo auto-fill chip */}
                    {demoOtpCode && (
                      <div className="text-center mb-3">
                        <button
                          type="button"
                          onClick={handleAutoFillWorkerDemoOtp}
                          className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full font-medium transition-colors cursor-pointer"
                        >
                          <span>ডেমো কোড অটো-ফিল:</span>
                          <strong className="font-mono tracking-wider">{toBengaliNumber(demoOtpCode)}</strong>
                        </button>
                      </div>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      loading={loading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 mt-2 flex items-center justify-center gap-2"
                    >
                      <ShieldCheck size={18} />
                      <span>যাচাই করে লগইন করুন</span>
                    </Button>
                  </div>
                )}
              </form>
            ) : (
              /* Standard Password Login Form */
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {userType === 'worker' ? 'মোবাইল নম্বর বা ইমেইল' : 'ইমেইল অ্যাড্রেস'}
                  </label>
                  <div className="relative">
                    {userType === 'worker' ? (
                      <Phone className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    ) : (
                      <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    )}
                    <input
                      type="text"
                      placeholder={userType === 'worker' ? 'যেমন: 01700000001' : 'আপনার ইমেইল লিখুন'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="পাসওয়ার্ড লিখুন"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 mt-2"
                >
                  লগইন করুন
                </Button>
              </form>
            )}

            {/* Auto-fill demo button */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => fillDemoCredentials(userType)}
                className="text-xs text-emerald-700 hover:underline font-semibold"
              >
                ডেমো ক্রেডেনশিয়াল অটো-ফিল করুন
              </button>
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
