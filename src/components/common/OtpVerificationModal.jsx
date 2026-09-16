import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, CheckCircle2, AlertCircle, RefreshCw, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './index';
import { authService } from '../../services/api';
import { toBengaliNumber, toAsciiNumber } from '../../utils/formatters';

const OtpVerificationModal = ({
  isOpen,
  onClose,
  phone,
  purpose = 'REGISTRATION',
  onVerified,
  title = 'মোবাইল নম্বর ওটিপি (OTP) যাচাইকরণ',
  description = 'আপনার মোবাইল নম্বরে পাঠানো ৬-সংখ্যার কোডটি প্রবেশ করান',
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [demoCode, setDemoCode] = useState('');
  const inputRefs = useRef([]);

  // Send initial OTP when opened
  useEffect(() => {
    if (isOpen && phone) {
      handleSendOtp();
    } else {
      setOtp(['', '', '', '', '', '']);
      setError('');
      setSuccessMsg('');
    }
  }, [isOpen, phone]);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleSendOtp = async () => {
    if (!phone) return;
    setSending(true);
    setError('');
    try {
      const res = await authService.sendOtp(phone, purpose);
      if (res.success) {
        setCountdown(120);
        if (res.demoOtp) {
          setDemoCode(res.demoOtp);
        }
        setSuccessMsg(res.message || 'আপনার নম্বরে ওটিপি কোড পাঠানো হয়েছে।');
      }
    } catch (err) {
      setError(err.message || 'ওটিপি পাঠাতে সমস্যা হয়েছে।');
    } finally {
      setSending(false);
    }
  };

  const handleOtpChange = (index, value) => {
    // Check if pasted full code
    const asciiVal = toAsciiNumber(value);
    if (asciiVal.length > 1) {
      const digits = asciiVal.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(digits.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    // Single digit input
    const singleDigit = asciiVal.slice(-1);
    if (singleDigit && !/^\d$/.test(singleDigit)) return;

    const newOtp = [...otp];
    newOtp[index] = singleDigit;
    setOtp(newOtp);
    setError('');

    // Auto advance focus
    if (singleDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillDemo = () => {
    if (!demoCode) return;
    const digits = demoCode.split('');
    setOtp(digits);
    setError('');
    inputRefs.current[5]?.focus();
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('অনুগ্রহ করে ৬-সংখ্যার সম্পূর্ণ ওটিপি কোড লিখুন।');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await authService.verifyOtp(phone, fullOtp, purpose);
      if (res.success) {
        setSuccessMsg('মোবাইল নম্বর সফলভাবে যাচাই করা হয়েছে!');
        setTimeout(() => {
          if (onVerified) {
            onVerified({ phone, otp: fullOtp, verified: true });
          }
          if (onClose) onClose();
        }, 600);
      } else {
        setError(res.message || 'ভুল ওটিপি কোড।');
      }
    } catch (err) {
      setError(err.message || 'ওটিপি যাচাই করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedCountdown = `${toBengaliNumber(String(minutes).padStart(2, '0'))}:${toBengaliNumber(String(seconds).padStart(2, '0'))}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* Header Icon */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Smartphone size={28} />
          </div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            এসএমএস ওটিপি যাচাইকরণ
          </span>
          <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{description}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-mono font-bold text-slate-800">
            <span>+৮৮{toBengaliNumber(phone)}</span>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && !error && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 6 Digit Inputs */}
        <div className="flex justify-between gap-2 sm:gap-2.5 my-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit ? toBengaliNumber(digit) : ''}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-extrabold text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
            />
          ))}
        </div>

        {/* Demo Helper Pill (Dev/Sandbox Mode) */}
        {demoCode && (
          <div className="mb-5 text-center">
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer"
            >
              <span>ডেমো কোড বসান:</span>
              <strong className="font-mono tracking-widest">{toBengaliNumber(demoCode)}</strong>
            </button>
          </div>
        )}

        {/* Countdown & Resend */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <div>
            {countdown > 0 ? (
              <span>কোডের মেয়াদ: <strong className="text-emerald-700 font-mono">{formattedCountdown}</strong></span>
            ) : (
              <span className="text-red-600 font-bold">কোডের মেয়াদ শেষ!</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={countdown > 0 || sending}
            className={`inline-flex items-center gap-1 font-bold ${
              countdown > 0 || sending
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-emerald-600 hover:text-emerald-800 hover:underline cursor-pointer'
            }`}
          >
            <RefreshCw size={13} className={sending ? 'animate-spin' : ''} />
            <span>{sending ? 'পাঠানো হচ্ছে...' : 'পুনরায় কোড পাঠান'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleVerify}
            loading={loading}
            fullWidth
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            <span>কোড নিশ্চিত করুন</span>
          </Button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              পরে যাচাই করব / বাতিল
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
