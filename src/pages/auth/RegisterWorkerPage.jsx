import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Input, Select, Card, ProgressBar, Badge, OtpVerificationModal } from '../../components/common';
import { ArrowRight, ArrowLeft, CheckCircle2, User, MapPin, Briefcase, Award, Plus, Trash2, ShieldCheck, Smartphone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RegisterWorkerPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [verifiedOtpCode, setVerifiedOtpCode] = useState('');

  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    name: '',
    phone: '',
    email: '',
    nidNumber: '',
    dob: '',
    gender: '',

    // Step 2 - Location
    division: '',
    district: '',
    upazila: '',
    village: '',
    address: '',

    // Step 3 - Work Info
    occupation: '',
    experienceYears: '',
    salaryExpected: '',
    salaryType: 'daily',
    availability: 'immediately',
    bio: '',

    // Skills (Step 4)
    skills: [],
    newSkill: '',

    // Experience & Training (Step 5)
    experiences: [],
    trainings: [],
    companyName: '',
    jobRole: '',
    experienceLocation: '',
    trainingTitle: '',
    trainingInstitute: '',

    // Password (Step 6)
    password: '',
    confirmPassword: '',
  });

  const divisions = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];
  const divisionLabels = {
    Dhaka: 'ঢাকা',
    Chittagong: 'চট্টগ্রাম',
    Rajshahi: 'রাজশাহী',
    Khulna: 'খুলনা',
    Barisal: 'বরিশাল',
    Sylhet: 'সিলেট',
    Rangpur: 'রংপুর',
    Mymensingh: 'ময়মনসিংহ',
  };

  const occupations = [
    'ইলেকট্রিশিয়ান ও ওয়্যারিং টেকনিশিয়ান',
    'রাজমিস্ত্রি ও নির্মাণ কর্মী',
    'মাস্টার প্লাম্বার ও পাইপফিটার',
    'দর্জি ও স্যাম্পল মেকার',
    'হেভি ও লাইট ভেহিক্যাল ড্রাইভার',
    'কাঠমিস্ত্রি ও ফার্নিচার কারিগর',
    'রং মিস্ত্রি ও পেইন্টার',
    'টাইলস ও মার্বেল ফিটিং কারিগর',
    'ওয়েল্ডার ও গ্রিল মেকার',
    'এসি ও ফ্রিজ মেকানিক',
    'কৃষি ও খামার শ্রমিক',
    'অন্যান্য',
  ];

  const popularSkills = [
    '৩-ফেজ ওয়্যারিং', 'ডিবি বোর্ড সেটআপ', 'টাইলস লেয়িং', 'প্যাটার্ন কাটিং',
    'ওভারলক মেশিন', 'সিপিভিসি পাইপফিটিং', 'হেভি লাইসেন্স', 'সোলার ইনভার্টার',
    'প্লাস্টারিং', 'রড বাইন্ডিং', 'কাঠের পলিশ', 'আর্ক ওয়েল্ডিং',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'phone') {
      setIsPhoneVerified(false);
      setVerifiedOtpCode('');
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddSkill = (skillToAdd) => {
    const s = skillToAdd || formData.newSkill;
    if (s && !formData.skills.includes(s)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, s],
        newSkill: '',
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleAddExperience = () => {
    if (formData.companyName && formData.jobRole) {
      setFormData((prev) => ({
        ...prev,
        experiences: [
          ...prev.experiences,
          {
            companyName: prev.companyName,
            role: prev.jobRole,
            location: prev.experienceLocation,
          },
        ],
        companyName: '',
        jobRole: '',
        experienceLocation: '',
      }));
    }
  };

  const handleAddTraining = () => {
    if (formData.trainingTitle) {
      setFormData((prev) => ({
        ...prev,
        trainings: [
          ...prev.trainings,
          {
            title: prev.trainingTitle,
            institute: prev.trainingInstitute || 'টেকনিক্যাল ইনস্টিটিউট',
          },
        ],
        trainingTitle: '',
        trainingInstitute: '',
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'আপনার পূর্ণ নাম লিখুন';
      if (!formData.phone.trim() && !formData.email.trim()) newErrors.phone = 'মোবাইল নম্বর অথবা ইমেইল আবশ্যক';
    } else if (step === 2) {
      if (!formData.division) newErrors.division = 'বিভাগ নির্বাচন করুন';
      if (!formData.district.trim()) newErrors.district = 'জেলার নাম লিখুন';
    } else if (step === 3) {
      if (!formData.occupation) newErrors.occupation = 'আপনার প্রধান পেশা নির্বাচন করুন';
    } else if (step === 6) {
      if (!formData.password) newErrors.password = 'পাসওয়ার্ড লিখুন';
      else if (formData.password.length < 6) newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'পাসওয়ার্ড দুটি মিলছে না';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    // If step 1, phone is provided, and not yet verified -> pop up OTP modal
    if (step === 1 && formData.phone.trim() && !isPhoneVerified) {
      setShowOtpModal(true);
      return;
    }

    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleOtpSuccess = ({ phone, otp }) => {
    setIsPhoneVerified(true);
    setVerifiedOtpCode(otp);
    setShowOtpModal(false);
    setStep(2); // Auto advance to Step 2!
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    try {
      const payload = {
        role: 'worker',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        otp: verifiedOtpCode || undefined,
        nidNumber: formData.nidNumber,
        dob: formData.dob,
        gender: formData.gender,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        village: formData.village,
        address: formData.address,
        occupation: formData.occupation,
        experienceYears: formData.experienceYears ? Number(formData.experienceYears) : 0,
        salaryExpected: formData.salaryExpected ? Number(formData.salaryExpected) : null,
        salaryType: formData.salaryType,
        availability: formData.availability,
        bio: formData.bio,
        skills: formData.skills,
        experiences: formData.experiences,
        trainings: formData.trainings,
        profileCompletion: 85,
      };

      const res = await register(payload);
      if (res && res.success) {
        navigate('/worker/dashboard');
      }
    } catch (err) {
      setErrors({ submit: err.message || 'নিবন্ধন করতে সমস্যা হয়েছে।' });
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    'মৌলিক তথ্য',
    'ঠিকানা ও অবস্থান',
    'পেশা ও কাজের বিবরণ',
    'দক্ষতা নির্বাচন',
    'অভিজ্ঞতা ও প্রশিক্ষণ',
    'পাসওয়ার্ড ও সমাপ্তি',
  ];

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
          {/* Top Title */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              শ্রমিক নিবন্ধন ফর্ম
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ডিজিটাল স্কিল পাসপোর্ট তৈরি করুন
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ধাপ {step} এর ৬: {stepTitles[step - 1]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
              {errors.submit}
            </div>
          )}

          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl bg-white">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">১. ব্যক্তিগত তথ্য</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পূর্ণ নাম (বাংলা বা ইংরেজি) *</label>
                  <input
                    type="text"
                    placeholder="যেমন: মোঃ রহিম উদ্দিন"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">মোবাইল নম্বর *</label>
                      {isPhoneVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck size={13} /> যাচাইকৃত
                        </span>
                      ) : formData.phone.trim().length >= 11 ? (
                        <button
                          type="button"
                          onClick={() => setShowOtpModal(true)}
                          className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 hover:underline flex items-center gap-1"
                        >
                          <Smartphone size={12} /> ওটিপি পাঠান
                        </button>
                      ) : null}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="যেমন: 01700000001"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full text-sm px-4 py-2.5 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500 ${
                          isPhoneVerified ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-300'
                        }`}
                      />
                      {isPhoneVerified && (
                        <CheckCircle2
                          size={18}
                          className="absolute right-3.5 top-3 text-emerald-600 pointer-events-none"
                        />
                      )}
                    </div>
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID)</label>
                    <input
                      type="text"
                      placeholder="১০ বা ১৭ ডিজিটের এনআইডি"
                      value={formData.nidNumber}
                      onChange={(e) => handleInputChange('nidNumber', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">লিঙ্গ</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">নারী</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">২. ঠিকানা ও অবস্থান</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">বিভাগ *</label>
                    <select
                      value={formData.division}
                      onChange={(e) => handleInputChange('division', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                      <option value="">বিভাগ নির্বাচন করুন</option>
                      {divisions.map((d) => (
                        <option key={d} value={d}>
                          {divisionLabels[d] || d}
                        </option>
                      ))}
                    </select>
                    {errors.division && <p className="text-xs text-red-600 mt-1">{errors.division}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">জেলা *</label>
                    <input
                      type="text"
                      placeholder="যেমন: ঢাকা / চট্টগ্রাম"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">উপজেলা / থানা</label>
                    <input
                      type="text"
                      placeholder="যেমন: মিরপুর / সদর"
                      value={formData.upazila}
                      onChange={(e) => handleInputChange('upazila', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">গ্রাম / এলাকা</label>
                    <input
                      type="text"
                      placeholder="যেমন: সেকশন ১০"
                      value={formData.village}
                      onChange={(e) => handleInputChange('village', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সম্পূর্ণ ঠিকানা</label>
                  <input
                    type="text"
                    placeholder="বাড়ি/রোড নম্বর, বিস্তারিত ঠিকানা"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Work Info */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৩. পেশা ও কাজের বিবরণ</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রধান পেশা / ট্রেড *</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <option value="">পেশা নির্বাচন করুন</option>
                    {occupations.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                  {errors.occupation && <p className="text-xs text-red-600 mt-1">{errors.occupation}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কাজের অভিজ্ঞতা (বছর)</label>
                    <input
                      type="number"
                      placeholder="যেমন: ৫"
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">প্রত্যাশিত দৈনিক মজুরি (৳)</label>
                    <input
                      type="number"
                      placeholder="যেমন: ৮০০"
                      value={formData.salaryExpected}
                      onChange={(e) => handleInputChange('salaryExpected', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">কাজের উপলব্ধতা (Availability)</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <option value="immediately">অবিলম্বে কাজের জন্য প্রস্তুত</option>
                    <option value="within-week">১ সপ্তাহের মধ্যে প্রস্তুত</option>
                    <option value="negotiable">আলোচনা সাপেক্ষে</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">নিজের সম্পর্কে সংক্ষিপ্ত বিবরণ</label>
                  <textarea
                    rows={3}
                    placeholder="আপনার কাজের বিশেষত্ব বা অভিজ্ঞতা সম্পর্কে লিখুন..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৪. কাজের বিশেষ দক্ষতা</h3>
                <p className="text-xs text-slate-500">আপনার জানা দক্ষতাগুলো ক্লিক করে যুক্ত করুন অথবা নিজে লিখুন।</p>

                {/* Popular Skills Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {popularSkills.map((sk) => (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => handleAddSkill(sk)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        formData.skills.includes(sk)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      + {sk}
                    </button>
                  ))}
                </div>

                {/* Add Custom Skill */}
                <div className="flex gap-2 pt-3">
                  <input
                    type="text"
                    placeholder="অন্য কোনো দক্ষতা লিখুন..."
                    value={formData.newSkill}
                    onChange={(e) => handleInputChange('newSkill', e.target.value)}
                    className="flex-1 text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <Button type="button" onClick={() => handleAddSkill()} className="bg-emerald-600 text-white rounded-xl">
                    যোগ করুন
                  </Button>
                </div>

                {/* Selected Skills */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-2">যুক্তকৃত দক্ষতা সমূহ ({formData.skills.length})</label>
                  {formData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((sk) => (
                        <span
                          key={sk}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(sk)}
                            className="text-emerald-600 hover:text-red-600"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">এখনও কোনো দক্ষতা যুক্ত করা হয়নি।</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Experience & Training */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৫. বিগত অভিজ্ঞতা ও প্রশিক্ষণ</h3>

                {/* Add Past Experience */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">বিগত কাজের অভিজ্ঞতা যোগ করুন</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="প্রতিষ্ঠানের নাম বা ক্লায়েন্ট"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="text-xs px-3 py-2 border rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="কাজের পদবি (যেমন: প্রধান মিস্ত্রি)"
                      value={formData.jobRole}
                      onChange={(e) => handleInputChange('jobRole', e.target.value)}
                      className="text-xs px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <Button type="button" onClick={handleAddExperience} size="sm" variant="outline" className="text-xs">
                    + অভিজ্ঞতা যোগ করুন
                  </Button>
                </div>

                {formData.experiences.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">যুক্তকৃত অভিজ্ঞতা:</label>
                    {formData.experiences.map((exp, idx) => (
                      <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{exp.role}</p>
                          <p className="text-slate-500">{exp.companyName}</p>
                        </div>
                        <span className="text-emerald-600 font-bold">✓ সংরক্ষিত</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Training */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">প্রশিক্ষণ বা সার্টিফিকেট যোগ করুন</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="কোর্সের নাম (যেমন: বেসিক ইলেকট্রিক্যাল)"
                      value={formData.trainingTitle}
                      onChange={(e) => handleInputChange('trainingTitle', e.target.value)}
                      className="text-xs px-3 py-2 border rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="ইনস্টিটিউট (যেমন: বিটিইবি / টিটিসি)"
                      value={formData.trainingInstitute}
                      onChange={(e) => handleInputChange('trainingInstitute', e.target.value)}
                      className="text-xs px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <Button type="button" onClick={handleAddTraining} size="sm" variant="outline" className="text-xs">
                    + প্রশিক্ষণ যোগ করুন
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Password Setup */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৬. পাসওয়ার্ড তৈরি ও অ্যাকাউন্ট সমাপ্তি</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড সেট করুন (কমপক্ষে ৬ অক্ষর) *</label>
                  <input
                    type="password"
                    placeholder="পাসওয়ার্ড লিখুন"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন *</label>
                  <input
                    type="password"
                    placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-700" />
                    আপনার অ্যাকাউন্ট তথ্য সুরক্ষিত
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    রেজিস্ট্রেশন সম্পন্ন হওয়ার সাথে সাথে আপনার জন্য একটি অনন্য ডিজিটাল আইডি (যেমন: <code>SHR-W-2026-XXXXX</code>) তৈরি হবে।
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                  className="rounded-xl text-xs font-bold gap-1.5"
                >
                  <ArrowLeft size={16} /> পূর্ববর্তী
                </Button>
              ) : (
                <Link to="/register">
                  <span className="text-xs text-slate-500 hover:underline">বাতিল করুন</span>
                </Link>
              )}

              {step < 6 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs gap-1.5 shadow-md"
                >
                  পরবর্তী ধাপ <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  loading={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 px-6"
                >
                  রেজিস্ট্রেশন সম্পন্ন করুন ✓
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* SMS OTP Verification Modal */}
        <OtpVerificationModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          phone={formData.phone}
          purpose="REGISTRATION"
          onVerified={handleOtpSuccess}
          title="শ্রমিক মোবাইল নম্বর যাচাইকরণ"
          description="আপনার দেওয়া মোবাইল নম্বরে ৬-সংখ্যার এসএমএস কোড পাঠানো হয়েছে। অনুগ্রহ করে কোডটি প্রবেশ করান।"
        />
      </div>
    </PublicLayout>
  );
};

export default RegisterWorkerPage;
