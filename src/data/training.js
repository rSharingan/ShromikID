/**
 * Mock Training Data (Bangla)
 */
export const trainingCourses = [
  {
    id: 1,
    name: 'অ্যাডভান্সড ব্রিক ম্যাসনরি ও স্ট্রাকচারাল নির্মাণ',
    provider: 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA)',
    category: 'Construction & Masonry',
    duration: '৩ মাস',
    mode: 'সরাসরি (ইন-পার্সন)',
    location: 'ঢাকা',
    price: 0,
    rating: 4.8,
    certificate: true,
    description: 'আধুনিক রাজমিস্ত্রি কৌশল, লেজার লেভেলিং ও ভূমিকম্প সহনশীল কাঠামো নির্মাণ প্রশিক্ষণ।',
    startDate: '২০২৬-১০-০১',
  },
  {
    id: 2,
    name: 'ইন্ডাস্ট্রিয়াল ইলেকট্রিক্যাল ওয়্যারিং ও সাবস্টেশন মেইনটেন্যান্স',
    provider: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB)',
    category: 'Electrical & Electronics',
    duration: '২ মাস',
    mode: 'হাইব্রিড (অনলাইন + ল্যাব)',
    location: 'গাজীপুর',
    price: 0,
    rating: 4.9,
    certificate: true,
    description: '৩-ফেজ মোটর কন্ট্রোল, অটোমেশন রিলে ও সেফটি স্ট্যান্ডার্ড প্রশিক্ষণ।',
    startDate: '২০২৬-০৯-২৫',
  },
  {
    id: 3,
    name: 'পেশাদার স্যানিটারি ও হাইড্রো প্লাম্বিং কোর্স',
    provider: 'ইউসেপ বাংলাদেশ (UCEP)',
    category: 'Plumbing & Sanitation',
    duration: '৬ সপ্তাহ',
    mode: 'সরাসরি প্র্যাকটিক্যাল',
    location: 'চট্টগ্রাম',
    price: 0,
    rating: 4.7,
    certificate: true,
    description: 'পিভিসি/সিপিভিসি পাইপ কানেকশন, সাবমার্সিবল পাম্প ও প্রেসার টেস্টিং।',
    startDate: '২০২৬-১০-১০',
  },
];

export const trainingCategories = [
  'Construction & Masonry',
  'Electrical & Electronics',
  'Plumbing & Sanitation',
  'Tailoring & Garments',
  'Transport & Driving',
  'Carpentry & Woodwork',
];

export const getCoursesByCategory = (category) => {
  return trainingCourses.filter(c => c.category === category);
};
