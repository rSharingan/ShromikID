// Bengali translation and formatting helper utilities

export const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const formatBengaliCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '';
  const formatted = Number(amount).toLocaleString('en-IN');
  return `৳${toBengaliNumber(formatted)}`;
};

export const formatBengaliDate = (dateString) => {
  if (!dateString) return 'সম্প্রতি';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const day = toBengaliNumber(date.getDate());
    const month = months[date.getMonth()];
    const year = toBengaliNumber(date.getFullYear());
    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
};

export const translateLocation = (location) => {
  if (!location) return 'বাংলাদেশ';
  const locationMap = {
    'Dhaka': 'ঢাকা',
    'Chittagong': 'চট্টগ্রাম',
    'Chattogram': 'চট্টগ্রাম',
    'Sylhet': 'সিলেট',
    'Khulna': 'খুলনা',
    'Rajshahi': 'রাজশাহী',
    'Barisal': 'বরিশাল',
    'Barishal': 'বরিশাল',
    'Rangpur': 'রংপুর',
    'Mymensingh': 'ময়মনসিংহ',
    'Gazipur': 'গাজীপুর',
    'Narayanganj': 'নারায়ণগঞ্জ',
    'Comilla': 'কুমিল্লা',
    'Cumilla': 'কুমিল্লা',
  };
  return locationMap[location] || location;
};

export const translateCategory = (category) => {
  if (!category) return 'সাধারণ পেশা';
  const categoryMap = {
    'Electrical & Electronics': 'ইলেকট্রিক্যাল ও ইলেকট্রনিক্স',
    'Electrical': 'ইলেকট্রিক্যাল ও ইলেকট্রনিক্স',
    'Construction & Masonry': 'নির্মাণ ও রাজমিস্ত্রি',
    'Construction': 'নির্মাণ ও রাজমিস্ত্রি',
    'Tailoring & Garments': 'দর্জি ও গার্মেন্টস',
    'Transport & Driving': 'পরিবহন ও ড্রাইভিং',
    'Driving': 'পরিবহন ও ড্রাইভিং',
    'Plumbing & Sanitation': 'প্লাম্বিং ও স্যানিটারি',
    'Plumbing': 'প্লাম্বিং ও স্যানিটারি',
    'Carpentry & Woodwork': 'কাঠমিস্ত্রি ও ফার্নিচার',
    'Domestic Work': 'গৃহস্থালি ও ক্লিনিং',
    'Hospitality': 'হোটেল ও হসপিটালিটি',
    'Digital Skills': 'ডিজিটাল স্কিলস',
    'Agriculture': 'কৃষি ও পশুপালন',
  };
  return categoryMap[category] || category;
};

export const translateJobType = (type) => {
  if (!type) return 'স্থায়ী';
  const typeMap = {
    'full-time': 'ফুল-টাইম (স্থায়ী)',
    'Full-time': 'ফুল-টাইম (স্থায়ী)',
    'part-time': 'পার্ট-টাইম',
    'Part-time': 'পার্ট-টাইম',
    'contract': 'চুক্তিভিত্তিক (প্রজেক্ট)',
    'Contract': 'চুক্তিভিত্তিক (প্রজেক্ট)',
    'project-based': 'চুক্তিভিত্তিক (প্রজেক্ট)',
    'Project-based': 'চুক্তিভিত্তিক (প্রজেক্ট)',
    'daily': 'দৈনিক হাজিরাভিত্তিক',
    'Daily': 'দৈনিক হাজিরাভিত্তিক',
  };
  return typeMap[type] || type;
};

export const translateSalaryType = (type) => {
  if (!type) return '';
  const salaryMap = {
    'daily': 'দৈনিক',
    'monthly': 'মাসিক',
    'hourly': 'ঘণ্টাপ্রতি',
    'contract': 'প্রজেক্টভিত্তিক',
    'project': 'প্রজেক্টভিত্তিক',
  };
  const translated = salaryMap[type.toLowerCase()] || type;
  return `/${translated}`;
};

export const formatSalary = (min, max, type) => {
  const typeStr = type ? translateSalaryType(type) : '';
  if (min && max) {
    return `${formatBengaliCurrency(min)} - ${formatBengaliCurrency(max)}${typeStr}`;
  }
  if (min) {
    return `${formatBengaliCurrency(min)}+${typeStr}`;
  }
  if (max) {
    return `পর্যন্ত ${formatBengaliCurrency(max)}${typeStr}`;
  }
  return 'আলোচনা সাপেক্ষে';
};

export const toAsciiNumber = (str) => {
  if (!str) return '';
  const bengaliDigits = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  return str.toString().replace(/[০-৯]/g, (d) => bengaliDigits[d]);
};



