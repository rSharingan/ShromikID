import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WorkerLayout from '../../components/layouts/WorkerLayout';
import { Card, Button, Input, Select, Avatar } from '../../components/common';
import { Home, User, Save, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toBengaliNumber } from '../../utils/formatters';

const WorkerProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'মো. রহিম',
    lastName: user?.name?.split(' ').slice(1).join(' ') || 'উদ্দিন',
    email: user?.email || 'rahim@demo.shramikid.local',
    phone: user?.phone || '০১৭০০-০০০০০১',
    occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
    experience: '৭',
    location: 'ঢাকা',
    upazila: 'মিরপুর',
    address: 'রোড ৪, ব্লক ডি, মিরপুর-১০, ঢাকা',
    nid: '১৯৮৯২৬৯১২৩৪৫৬৭৮৯০',
    dateOfBirth: '১৯৮৯-০৫-১২',
    about: '৩-ফেজ ইন্ডাস্ট্রিয়াল ওয়্যারিং, জেনারেটর সার্ভিসিং ও সোলার ইনভার্টার সেটআপে ৭+ বছরের অভিজ্ঞ সার্টিফাইড ইলেকট্রিশিয়ান।',
  });

  const sidebarItems = [
    { label: 'ড্যাশবোর্ড', href: '/worker/dashboard', icon: <Home size={20} /> },
    { label: 'আমার প্রোফাইল', href: '/worker/profile', icon: <User size={20} />, active: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const sections = [
    {
      title: 'ব্যক্তিগত তথ্য',
      fields: [
        { label: 'নামের প্রথম অংশ', name: 'firstName', type: 'text' },
        { label: 'নামের শেষ অংশ', name: 'lastName', type: 'text' },
        { label: 'ইমেইল ঠিকানা', name: 'email', type: 'email' },
        { label: 'মোবাইল নম্বর', name: 'phone', type: 'tel' },
        { label: 'জন্ম তারিখ', name: 'dateOfBirth', type: 'text' },
      ]
    },
    {
      title: 'পেশাগত ও দক্ষতার তথ্য',
      fields: [
        { label: 'মূল পেশা / ট্রেড', name: 'occupation', type: 'text' },
        { label: 'অভিজ্ঞতার বছর', name: 'experience', type: 'text' },
        { label: 'নিজের সম্পর্কে সংক্ষিপ্ত বিবরণ', name: 'about', type: 'textarea' },
      ]
    },
    {
      title: 'ঠিকানা ও অবস্থান',
      fields: [
        { label: 'জেলা', name: 'location', type: 'text' },
        { label: 'উপজেলা / থানা', name: 'upazila', type: 'text' },
        { label: 'বিস্তারিত ঠিকানা (রাস্তা / বাসা)', name: 'address', type: 'text' },
      ]
    },
    {
      title: 'জাতীয় পরিচয়পত্র ও সুরক্ষা তথ্য',
      fields: [
        { label: 'জাতীয় পরিচয়পত্র (এনআইডি) নম্বর', name: 'nid', type: 'text', disabled: true },
      ]
    }
  ];

  return (
    <WorkerLayout sidebarItems={sidebarItems}>
      <div className="bg-slate-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">আমার ডিজিটাল প্রোফাইল</h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">আপনার ব্যক্তিগত ও পেশাগত তথ্য পরিচালনা করুন</p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs px-5">
                তথ্য সম্পাদনা করুন
              </Button>
            )}
          </div>

          {/* Profile Avatar Section */}
          <Card className="mb-8 p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="text-center">
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                name={`${formData.firstName} ${formData.lastName}`}
                size="xl"
              />
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">{formData.firstName} {formData.lastName}</h2>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck size={12} /> যাচাইকৃত
                  </span>
                </div>
                <p className="text-slate-600 font-medium mt-1">{formData.occupation}</p>
                <p className="text-xs text-slate-500 mt-1">{toBengaliNumber(formData.experience)}+ বছরের অভিজ্ঞতা • {formData.location}</p>
              </div>

              {isEditing && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <label className="inline-block px-5 py-2 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs hover:bg-emerald-100 cursor-pointer transition-colors border border-emerald-200">
                    ছবি পরিবর্তন করুন
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </Card>

          {/* Form Sections */}
          {sections.map((section, idx) => (
            <Card key={idx} className="mb-6 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-5">{section.title}</h2>

              <div className="space-y-4">
                {section.fields.map((field, fidx) => (
                  <div key={fidx}>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {field.label}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        disabled={!isEditing || field.disabled}
                        rows={3}
                        className={`w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          !isEditing || field.disabled ? 'bg-slate-50 cursor-not-allowed text-slate-600' : 'bg-white'
                        }`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        disabled={!isEditing || field.disabled}
                        className={`w-full text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          !isEditing || field.disabled ? 'bg-slate-50 cursor-not-allowed text-slate-600' : 'bg-white'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 justify-end mb-8">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="rounded-full font-bold text-xs border-slate-300"
              >
                বাতিল করুন
              </Button>
              <Button
                onClick={handleSave}
                className="bg-emerald-600 text-white rounded-full font-bold text-xs"
              >
                সংরক্ষণ করুন
              </Button>
            </div>
          )}

          {/* Additional Options */}
          <Card className="bg-emerald-50/50 border border-emerald-200/70 p-6 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">অ্যাকাউন্ট সেটিংস ও নিরাপত্তা</h3>
            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded-2xl border border-emerald-100 transition-colors">
                <p className="font-bold text-xs text-slate-900">পাসওয়ার্ড পরিবর্তন</p>
                <p className="text-xs text-slate-500">নিরাপত্তার জন্য নিয়মিত পাসওয়ার্ড পরিবর্তন করুন</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-emerald-100 transition-colors">
                <p className="font-bold text-xs text-slate-900">গোপনীয়তা সেটিংস</p>
                <p className="text-xs text-slate-500">নিয়োগকর্তারা আপনার কোন তথ্য দেখতে পারবেন তা নির্ধারণ করুন</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-emerald-100 transition-colors">
                <p className="font-bold text-xs text-slate-900">বিজ্ঞপ্তি পছন্দ</p>
                <p className="text-xs text-slate-500">এসএমএস এবং অ্যাপ নোটিফিকেশনের মাধ্যমে নতুন কাজের আপডেট পান</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerProfilePage;
