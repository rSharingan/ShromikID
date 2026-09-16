import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, BadgeCheck, Briefcase, Phone, MessageSquare, Send, ShieldCheck } from 'lucide-react';
import Card from './Card';
import Avatar from './Avatar';
import Badge from './Badge';
import { toBengaliNumber, translateLocation, toAsciiNumber } from '../../utils/formatters';

/**
 * WorkerCard Component with Direct Connect & Direct Call Actions
 */
const WorkerCard = ({
  worker,
  showActions = true,
  onCall,
  onConnect,
}) => {
  const experienceYears = worker.experience ?? worker.workerProfile?.experienceYears ?? 0;
  const rawLocation = worker.location || (worker.workerProfile ? `${worker.workerProfile.district}, ${worker.workerProfile.division}` : 'বাংলাদেশ');
  const locationText = rawLocation.split(',').map(p => translateLocation(p.trim())).join(', ');
  const occupationText = worker.occupation || worker.workerProfile?.occupation || 'দক্ষ কর্মী';
  const ratingValue = worker.rating || worker.workerProfile?.rating;
  const skillsList = worker.skills || worker.workerProfile?.skills || [];
  const rawPhone = worker.phone || worker.workerProfile?.phone || '০১৭০০-০০০০০১';
  const asciiPhone = toAsciiNumber(rawPhone).replace(/[^0-9+]/g, '');

  const handleCallClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCall) {
      onCall(worker);
    } else {
      window.location.href = `tel:${asciiPhone}`;
    }
  };

  const handleConnectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onConnect) {
      onConnect(worker);
    }
  };

  return (
    <Card hover className="h-full group/card border border-slate-200/90 hover:border-emerald-500 rounded-3xl p-5 sm:p-6 bg-white shadow-sm flex flex-col justify-between transition-all">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <Avatar src={worker.avatar} name={worker.name} size="lg" className="rounded-2xl" />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link to={`/employer/workers/${worker.id}`} className="font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors">
                  {worker.name}
                </Link>
                {(worker.verified || worker.verificationStatus === 'verified') && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                    <ShieldCheck size={11} className="text-emerald-700" /> ভেরিফাইড
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">{occupationText}</p>
            </div>
          </div>
          {ratingValue && (
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/70">
              <Star size={14} className="text-amber-500 fill-amber-400" />
              <span className="text-xs font-bold text-amber-900">{toBengaliNumber(ratingValue)}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-emerald-600 flex-shrink-0" />
            <span>{locationText}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-emerald-600 flex-shrink-0" />
            <span>{toBengaliNumber(experienceYears)} বছরের কাজের অভিজ্ঞতা</span>
          </div>
        </div>

        {/* Skills */}
        {skillsList && skillsList.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-slate-700 mb-1.5">সত্যায়িত দক্ষতাসমূহ</p>
            <div className="flex flex-wrap gap-1">
              {skillsList.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200/60">
                  {typeof skill === 'object' ? skill.name : skill}
                </span>
              ))}
              {skillsList.length > 3 && (
                <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg font-medium border border-slate-200/60">
                  + আরও {toBengaliNumber(skillsList.length - 3)}টি
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Direct Action Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={handleCallClick}
          className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          title="সরাসরি ফোন কল করুন"
        >
          <Phone size={14} />
          <span>সরাসরি কল</span>
        </button>
        <button
          onClick={handleConnectClick}
          className="flex-1 py-2 px-3 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          title="মেসেজ বা কাজের অফার পাঠান"
        >
          <Send size={14} />
          <span>কানেক্ট / অফার</span>
        </button>
      </div>
    </Card>
  );
};

export default WorkerCard;
