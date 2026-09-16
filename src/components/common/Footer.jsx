import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed">
              বাংলাদেশের ৫ কোটিরও বেশি অপ্রাতিষ্ঠানিক শ্রমজীবীদের জন্য প্রথম জাতীয় ডিজিটাল স্কিল পাসপোর্ট, কর্মসংস্থান ও কল্যাণ প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck size={16} />
              <span>স্মার্ট বাংলাদেশ ডিজিটাল ইনিশিয়েটিভ</span>
            </div>
          </div>

          {/* Workers Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide">শ্রমিকদের জন্য</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register/worker" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  বিনামূল্যে আইডি তৈরি
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  সরাসরি কাজের আবেদন
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  ডিজিটাল স্কিল পাসপোর্ট
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  শ্রমিক ড্যাশবোর্ড লগইন
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide">নিয়োগকর্তাদের জন্য</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register/employer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  নিয়োগকর্তা রেজিস্ট্রেশন
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  নতুন কাজের সার্কুলার পোস্ট
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  যাচাইকৃত কর্মী নিয়োগ প্রক্রিয়া
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  নিয়োগকর্তা পোর্টাল
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide">সহায়তা ও যোগাযোগ</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-emerald-400 flex-shrink-0" />
                <span>হেল্পলাইন: ১৬২৬৩ / ০১৭০০০০০০০১</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-emerald-400 flex-shrink-0" />
                <span>support@shramikid.gov.bd</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-emerald-400 flex-shrink-0" />
                <span>আগারগাঁও, ঢাকা-১২০৭, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} শ্রমিকআইডি (ShramikID). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-2">
            <span>বাংলাদেশের শ্রমজীবী মানুষের কল্যাণে নিবেদিত</span>
            <Heart size={14} className="text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
