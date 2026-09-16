import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Input, Card, LogoIcon } from '../../components/common';
import { Lock, Mail, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, demoAccounts } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, 'admin');
    setLoading(false);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে');
    }
  };

  const fillDemoCredentials = () => {
    setEmail(demoAccounts.admin.email);
    setPassword(demoAccounts.admin.password);
    setShowDemo(false);
  };

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen py-12 sm:py-20 lg:py-28 flex items-center">
        <div className="max-w-md mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3.5 bg-slate-800 border-2 border-emerald-500/80 text-emerald-400 rounded-3xl mb-4 shadow-xl shadow-emerald-900/40">
              <LogoIcon size={40} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">সেন্ট্রাল অ্যাডমিন লগইন</h1>
            <p className="text-slate-400 text-xs sm:text-sm">শ্রমিক আইডি প্ল্যাটফর্ম ম্যানেজমেন্ট ও ভেরিফিকেশন পোর্টাল</p>
          </div>

          <Card className="p-8 shadow-2xl bg-slate-800 border border-slate-700 rounded-3xl">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3.5">
                  <p className="text-xs text-red-300 font-medium">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">অ্যাডমিন ইমেইল ঠিকানা</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@shramikid.demo"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">গোপন পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm py-2.5 shadow-md shadow-emerald-900/40"
              >
                প্রবেশ করুন
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="w-full text-xs text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
              >
                {showDemo ? 'ডেমো তথ্য লুকান' : 'ডেমো অ্যাকাউন্টের তথ্য দেখুন'}
              </button>

              {showDemo && (
                <div className="mt-3 space-y-2 p-4 bg-slate-700/60 rounded-2xl border border-slate-600 text-xs">
                  <div>
                    <p className="text-slate-400">ইমেইল:</p>
                    <p className="text-white font-mono">{demoAccounts.admin.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">পাসওয়ার্ড:</p>
                    <p className="text-white font-mono">{demoAccounts.admin.password}</p>
                  </div>
                  <Button
                    onClick={fillDemoCredentials}
                    variant="outline"
                    fullWidth
                    className="mt-2 text-xs border-slate-600 text-slate-200 hover:bg-slate-600 rounded-xl"
                  >
                    স্বয়ংক্রিয়ভাবে পূরণ করুন
                  </Button>
                </div>
              )}
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-white transition-colors font-medium"
              >
                ← হোমপেজে ফিরে যান
              </a>
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AdminLoginPage;
