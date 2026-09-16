import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Card } from '../../components/common';
import { ArrowRight, ArrowLeft, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RegisterEmployerPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Step 1 - Business Information
    companyName: '',
    businessType: '',
    industry: '',
    tradeLicenseNo: '',
    email: '',
    phone: '',
    website: '',

    // Step 2 - Authorized Person
    contactPerson: '',
    contactPhone: '',

    // Step 3 - Location
    division: '',
    district: '',
    upazila: '',
    address: '',

    // Step 4 - Business Details
    employeeCount: '1-10',
    operationYears: '1',

    // Step 5 - Password
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

  const businessTypes = [
    'কনস্ট্রাকশন ও সিভিল ইঞ্জিনিয়ারিং',
    'রিয়েল এস্টেট ও ডেভেলপার',
    'ম্যানুফ্যাকচারিং ও ফ্যাক্টরি',
    'গার্মেন্টস ও টেক্সটাইল',
    'পরিবহন ও লজিস্টিকস',
    'কৃষি ও এগ্রো ফার্ম',
    'হোটেল, রেস্টুরেন্ট ও ক্যাটারিং',
    'ব্যক্তিগত গৃহমালিক / ঠিকাদার',
    'অন্যান্য ব্যবসা প্রতিষ্ঠান',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'কোম্পানি বা ব্যবসার নাম লিখুন';
      if (!formData.email.trim()) newErrors.email = 'ইমেইল অ্যাড্রেস আবশ্যক';
    } else if (step === 2) {
      if (!formData.contactPerson.trim()) newErrors.contactPerson = 'দায়িত্বপ্রাপ্ত ব্যক্তির নাম লিখুন';
    } else if (step === 3) {
      if (!formData.division) newErrors.division = 'বিভাগ নির্বাচন করুন';
      if (!formData.district.trim()) newErrors.district = 'জেলার নাম লিখুন';
    } else if (step === 5) {
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
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    try {
      const payload = {
        role: 'employer',
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        businessType: formData.businessType,
        industry: formData.industry,
        tradeLicenseNo: formData.tradeLicenseNo,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        address: formData.address,
        website: formData.website,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone || formData.phone,
        employeeCount: formData.employeeCount,
        operationYears: formData.operationYears ? Number(formData.operationYears) : 1,
        profileCompletion: 80,
      };

      const res = await register(payload);
      if (res && res.success) {
        navigate('/employer/dashboard');
      }
    } catch (err) {
      setErrors({ submit: err.message || 'নিবন্ধন করতে সমস্যা হয়েছে।' });
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    'কোম্পানি বা ব্যবসার তথ্য',
    'দায়িত্বপ্রাপ্ত কর্মকর্তার তথ্য',
    'অফিসের ঠিকানা ও অবস্থান',
    'ব্যবসার বিবরণ',
    'পাসওয়ার্ড ও সমাপ্তি',
  ];

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
          {/* Top Title */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              নিয়োগকর্তা নিবন্ধন ফর্ম
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              কোম্পানি বা নিয়োগকারী প্রোফাইল খুলুন
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ধাপ {step} এর ৫: {stepTitles[step - 1]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
              {errors.submit}
            </div>
          )}

          <Card className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl bg-white">
            {/* Step 1: Business Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">১. ব্যবসার মৌলিক তথ্য</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">কোম্পানি / প্রতিষ্ঠানের নাম *</label>
                  <input
                    type="text"
                    placeholder="যেমন: এবিসি কনস্ট্রাকশন অ্যান্ড রিয়েল এস্টেট"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.companyName && <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ব্যবসার ধরন / সেক্টর</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">ধরন নির্বাচন করুন</option>
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল ইমেইল *</label>
                    <input
                      type="email"
                      placeholder="info@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ট্রেড লাইসেন্স নম্বর</label>
                    <input
                      type="text"
                      placeholder="TRAD/DSCC/..."
                      value={formData.tradeLicenseNo}
                      onChange={(e) => handleInputChange('tradeLicenseNo', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Person */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">২. দায়িত্বপ্রাপ্ত কর্মকর্তার তথ্য</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">যোগাযোগকারী কর্মকর্তার নাম *</label>
                  <input
                    type="text"
                    placeholder="যেমন: ইঞ্জিঃ ফারহান চৌধুরী"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.contactPerson && <p className="text-xs text-red-600 mt-1">{errors.contactPerson}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">যোগাযোগের মোবাইল নম্বর</label>
                  <input
                    type="text"
                    placeholder="যেমন: 01811112233"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৩. অফিসের অবস্থান</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">বিভাগ *</label>
                    <select
                      value={formData.division}
                      onChange={(e) => handleInputChange('division', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">বিস্তারিত অফিসের ঠিকানা</label>
                  <input
                    type="text"
                    placeholder="বাড়ি/প্লট, রোড, এলাকা"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Business Details */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৪. ব্যবসার বিবরণ ও আকার</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কর্মচারী / শ্রমিকের সংখ্যা</label>
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="1-10">১ - ১০ জন</option>
                      <option value="10-50">১০ - ৫০ জন</option>
                      <option value="50-100">৫০ - ১০০ জন</option>
                      <option value="100+">১০০+ জন</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">কত বছর ধরে ব্যবসা পরিচালনা করছেন?</label>
                    <input
                      type="number"
                      placeholder="যেমন: ৩"
                      value={formData.operationYears}
                      onChange={(e) => handleInputChange('operationYears', e.target.value)}
                      className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Password */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">৫. পাসওয়ার্ড তৈরি</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *</label>
                  <input
                    type="password"
                    placeholder="পাসওয়ার্ড লিখুন"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
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

              {step < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs gap-1.5 shadow-md"
                >
                  পরবর্তী ধাপ <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  loading={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30 px-6"
                >
                  কোম্পানি অ্যাকাউন্ট সম্পন্ন করুন ✓
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterEmployerPage;
