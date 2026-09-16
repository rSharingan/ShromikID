/**
 * Mock Workers Data (Bangla)
 */
export const workers = [
  {
    id: 1,
    name: 'মো. রহিম উদ্দিন',
    occupation: 'সিনিয়র ইন্ডাস্ট্রিয়াল ইলেকট্রিশিয়ান',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    experience: 7,
    location: 'ঢাকা',
    district: 'ঢাকা',
    division: 'ঢাকা',
    verified: true,
    verificationStatus: 'verified',
    rating: 4.9,
    skills: ['৩-ফেজ ইন্ডাস্ট্রিয়াল ওয়্যারিং', 'সার্কিট ব্রেকার সেটআপ', 'সোলার ইনভার্টার', 'সেফটি প্রটোকল'],
    nid: '১৯৮৯২৬৯১২৩৪৫৬৭৮৯০',
    phone: '০১৭০০-০০০০০১',
    email: 'rahim@demo.shramikid.local',
    certificates: [
      {
        id: 1,
        name: 'ন্যাশনাল স্কিল স্ট্যান্ডার্ড বেসিক (এনএসএসবি) - ইলেকট্রিক্যাল',
        provider: 'বিটিইবি / ঢাকা পলিটেকনিক',
        issueDate: '২০১৯-০৬-১৫',
        credentialId: 'RPL-2019-001234',
        verified: true,
      },
    ],
    workHistory: [
      {
        id: 1,
        company: 'বেক্সিমকো ইন্ডাস্ট্রিয়াল পার্ক',
        title: 'মেইনটেন্যান্স ইলেকট্রিশিয়ান',
        startDate: '২০২১-০১',
        endDate: '২০২৪-০৩',
        location: 'গাজীপুর',
        verified: true,
      },
    ],
  },
  {
    id: 2,
    name: 'করিমা বেগম',
    occupation: 'মাস্টার টেইলার ও প্যাটার্ন মেকার',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    experience: 5,
    location: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    division: 'চট্টগ্রাম',
    verified: true,
    verificationStatus: 'verified',
    rating: 4.8,
    skills: ['ইন্ডাস্ট্রিয়াল প্যাটার্ন কাটিং', 'ওভারলক ও ফ্ল্যাটলক মেশিন', 'কোয়ালিটি কন্ট্রোল ও ফিনিশিং'],
    nid: '১৯৯৩২৬৯১২৩৪৫৬৭৮৯১',
    phone: '০১৭০০-০০০০০২',
    email: 'karima@demo.shramikid.local',
  },
  {
    id: 3,
    name: 'আবুল হোসেন',
    occupation: 'স্যানিটারি ও পাইপ ফিটিং মিস্ত্রি',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    experience: 6,
    location: 'সিলেট',
    district: 'সিলেট',
    division: 'সিলেট',
    verified: false,
    verificationStatus: 'pending',
    rating: 4.7,
    skills: ['পিপিআর ও সিপিভিসি পাইপ ফিটিং', 'সাবমার্সিবল পাম্প ইনস্টলেশন', 'লিকেজ ডায়াগনস্টিক'],
  },
  {
    id: 4,
    name: 'হোসনে আরা আক্তার',
    occupation: 'হোম ও অফিস ক্লিনিং এক্সপার্ট',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    experience: 8,
    location: 'ঢাকা',
    district: 'ঢাকা',
    division: 'ঢাকা',
    verified: true,
    verificationStatus: 'verified',
    rating: 4.6,
    skills: ['অফিস স্যানিটাইজেশন', 'ডিপ ক্লিনিং', 'ম্যাটেরিয়াল অর্গানাইজেশন'],
  },
];

/**
 * Get worker by ID
 */
export const getWorkerById = (id) => {
  return workers.find(w => w.id.toString() === id.toString() || w.id === parseInt(id));
};
