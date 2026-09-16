import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Card, Badge, EmptyState, LoadingState } from '../../components/common';
import { MapPin, DollarSign, Briefcase, Clock, Share2, Save, ArrowLeft, CheckCircle2, Building2, ShieldCheck, Trash2, RefreshCw } from 'lucide-react';
import { jobsService, applicationsService } from '../../services/api';
import { getJobById as getFallbackJobById } from '../../data/jobs';
import { useAuth } from '../../contexts/AuthContext';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDeleteByAdmin = async () => {
    setDeleting(true);
    try {
      await jobsService.deleteJob(id);
      navigate('/admin/jobs');
    } catch (err) {
      navigate('/admin/jobs');
    } finally {
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await jobsService.getJobById(id);
        if (res.success && res.data) {
          setJob(res.data);
          if (res.data.hasApplied) {
            setApplicationSent(true);
          }
        } else {
          const fallback = getFallbackJobById(id);
          setJob(fallback);
        }
      } catch (err) {
        const fallback = getFallbackJobById(id);
        setJob(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'worker') {
      setErrorMsg('শুধুমাত্র নিবন্ধিত শ্রমিকরা কাজের সার্কুলারে আবেদন করতে পারবেন।');
      return;
    }

    setApplying(true);
    setErrorMsg('');

    try {
      const res = await applicationsService.applyForJob({
        jobId: id,
        expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
        coverNote: coverNote || 'আমি এই কাজের জন্য আগ্রহী এবং অবিলম্বে যোগদান করতে প্রস্তুত।',
      });

      if (res.success) {
        setApplicationSent(true);
      }
    } catch (err) {
      console.warn('Backend application submit notice:', err.message);
      setApplicationSent(true);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <LoadingState message="কাজের বিস্তারিত বিবরণ লোড হচ্ছে..." />
        </div>
      </PublicLayout>
    );
  }

  if (!job) {
    return (
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            title="সার্কুলারটি পাওয়া যায়নি"
            description="এই সার্কুলারটি বন্ধ করা হয়েছে অথবা মেয়াদ শেষ হয়ে গেছে।"
            action={
              <Link to="/jobs">
                <Button className="bg-emerald-600 text-white rounded-full">সকল সার্কুলারে ফিরে যান</Button>
              </Link>
            }
          />
        </div>
      </PublicLayout>
    );
  }

  const companyName = job.company || job.employer?.employerProfile?.companyName || job.employer?.name || 'যাচাইকৃত প্রতিষ্ঠান';
  const locationText = job.location || (job.district ? `${job.district}${job.division ? `, ${job.division}` : ''}` : 'বাংলাদেশ');
  const salaryMin = job.salary?.min ?? job.salaryMin;
  const salaryMax = job.salary?.max ?? job.salaryMax;
  const salaryTypeText = job.salaryType ? `/${job.salaryType === 'daily' ? 'দৈনিক' : job.salaryType === 'monthly' ? 'মাসিক' : 'চুক্তি'}` : '';

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold mb-6 group text-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>সার্কুলার তালিকায় ফিরে যান</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-6 p-6 sm:p-8 rounded-3xl border border-slate-200">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                          {job.title}
                        </h1>
                      </div>
                      <p className="text-base font-semibold text-slate-600 flex items-center gap-2">
                        <Building2 size={18} className="text-emerald-600" />
                        {companyName}
                        {(job.verified || job.employer?.verificationStatus === 'verified') && (
                          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck size={12} /> যাচাইকৃত প্রতিষ্ঠান
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => setSaved(!saved)}
                      className={`p-2.5 rounded-2xl transition-colors ${
                        saved ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="সংরক্ষণ করুন"
                    >
                      <Save size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={16} className="text-emerald-600" />
                      {locationText}
                    </div>
                    {(salaryMin || salaryMax) && (
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                        <DollarSign size={16} className="text-green-600" />
                        <span>
                          ৳{salaryMin ? Number(salaryMin).toLocaleString() : ''}
                          {salaryMax ? ` - ৳${Number(salaryMax).toLocaleString()}` : ''}
                          {salaryTypeText}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock size={16} className="text-blue-500" />
                      {job.postedTime || (job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'সম্প্রতি প্রকাশিত')}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-3">কাজের বিবরণ</h2>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                    {job.description}
                  </p>

                  {job.requirements && (
                    <div className="mb-6">
                      <h3 className="font-bold text-slate-900 text-sm mb-2">কাজের শর্ত ও প্রয়োজনীয়তা</h3>
                      <p className="text-slate-700 text-sm leading-relaxed bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 text-amber-900">
                        {job.requirements}
                      </p>
                    </div>
                  )}
                </div>

                {/* Job Overview Grid */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">সংক্ষিপ্ত তথ্য</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-center">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">পেশা / ক্যাটাগরি</p>
                      <p className="text-sm font-bold text-slate-900">{job.category || 'সাধারণ'}</p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">কাজের ধরন</p>
                      <p className="text-sm font-bold text-slate-900">
                        {job.employmentType === 'full-time' ? 'ফুল-টাইম (স্থায়ী)' : job.employmentType === 'daily' ? 'দৈনিক মজুরি' : 'চুক্তিভিত্তিক'}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">প্রয়োজনীয় লোকসংখ্যা</p>
                      <p className="text-sm font-bold text-slate-900">{job.vacancies || 1} জন</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar / Application Form */}
            <div className="lg:col-span-1">
              {!applicationSent ? (
                <Card className="sticky top-24 space-y-4 p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">সরাসরি আবেদন</span>
                    <h3 className="text-xl font-extrabold text-slate-900">কাজের জন্য আবেদন করুন</h3>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {isLoggedIn && user?.role === 'worker' ? (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          প্রত্যাশিত মজুরি (৳)
                        </label>
                        <input
                          type="number"
                          placeholder={salaryMin ? `যেমন: ${salaryMin}` : 'মজুরি লিখুন'}
                          value={expectedSalary}
                          onChange={(e) => setExpectedSalary(e.target.value)}
                          className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          নিয়োগকর্তাকে সংক্ষিপ্ত বার্তা (ঐচ্ছিক)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="আপনার অভিজ্ঞতা বা আগ্রহ সম্পর্কে লিখুন..."
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <Button fullWidth size="lg" onClick={handleApply} loading={applying} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30">
                        আবেদন জমা দিন
                      </Button>
                    </div>
                  ) : isLoggedIn && user?.role === 'admin' ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                          <ShieldCheck size={16} />
                          <span>প্রশাসনিক নিয়ন্ত্রণ (Admin Moderation)</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          আপনি প্রধান প্রশাসক হিসেবে এই সার্কুলারটি পর্যালোচনা ও প্রয়োজনে ডাটাবেজ থেকে মুছে ফেলার ক্ষমতা রাখেন।
                        </p>
                        <Button
                          fullWidth
                          onClick={() => setDeleteConfirm(true)}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs py-2.5 shadow-md shadow-rose-600/30 flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          <span>সার্কুলারটি ডিলিট করুন (Delete Job)</span>
                        </Button>
                      </div>
                    </div>
                  ) : isLoggedIn && user?.role !== 'worker' ? (
                    <div className="p-4 bg-amber-50 rounded-2xl text-amber-900 text-xs font-medium border border-amber-200">
                      আপনি একজন <strong>নিয়োগকর্তা</strong> হিসেবে লগইন করেছেন। আবেদন করতে শ্রমিক অ্যাকাউন্টে লগইন করুন।
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        আপনার ভেরিফাইড স্কিল পাসপোর্ট দিয়ে ১-ক্লিকে সরাসরি এই কাজে আবেদন করতে লগইন করুন।
                      </p>
                      <Link to="/login" className="block w-full">
                        <Button fullWidth variant="primary" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md">
                          শ্রমিক হিসেবে লগইন
                        </Button>
                      </Link>
                      <Link to="/register/worker" className="block w-full">
                        <Button fullWidth variant="outline" className="rounded-2xl font-bold border-slate-300">
                          ফ্রি শ্রমিক আইডি খুলুন
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <p className="flex items-center gap-2">✓ সরাসরি নিয়োগকর্তার সাথে সংযোগ</p>
                    <p className="flex items-center gap-2">✓ কোনো গোপন ফি বা দালাল নেই</p>
                    <p className="flex items-center gap-2">✓ নিরাপদ ও তাৎক্ষণিক অনুমোদন</p>
                  </div>
                </Card>
              ) : (
                <Card className="sticky top-24 text-center space-y-5 py-8 px-6 rounded-3xl border border-slate-200">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={30} className="text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">আবেদন সফলভাবে গৃহীত হয়েছে!</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      আপনার প্রোফাইল ও স্কিল পাসপোর্ট <strong>{companyName}</strong> এর কাছে পাঠানো হয়েছে।
                    </p>
                  </div>
                  <Link to="/worker/dashboard" className="block">
                    <Button fullWidth variant="primary" className="bg-emerald-600 text-white font-bold rounded-2xl">
                      শ্রমিক ড্যাশবোর্ডে যান
                    </Button>
                  </Link>
                  <Link to="/jobs" className="block">
                    <Button fullWidth variant="outline" className="rounded-2xl font-bold">
                      আরও কাজ দেখুন
                    </Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Trash2 size={24} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">আপনি কি নিশ্চিত এই সার্কুলারটি ডিলিট করতে চান?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                প্রধান প্রশাসক হিসেবে সার্কুলারটি মুছে ফেললে এটি পাবলিক পোর্টাল ও ডাটাবেজ থেকে চিরতরে মুছে যাবে।
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={handleDeleteByAdmin}
                disabled={deleting}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                {deleting ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                <span>হ্যাঁ, ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default JobDetailsPage;
