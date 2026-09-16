/**
 * Mock Applications Data (Bangla)
 */
export const applications = [
  {
    id: 1,
    jobId: 1,
    workerId: 1,
    status: 'shortlisted',
    appliedDate: '২০২৬-০৯-১০',
    jobTitle: 'বাণিজ্যিক ভবনের জন্য সিনিয়র ইলেকট্রিশিয়ান আবশ্যক',
    workerName: 'মো. রহিম উদ্দিন',
    company: 'এবিসি কনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট লি.',
  },
  {
    id: 2,
    jobId: 3,
    workerId: 2,
    status: 'accepted',
    appliedDate: '২০২৬-০৯-১২',
    jobTitle: 'রপ্তানিমুখী পোশাক কারখানায় মাস্টার টেইলার ও স্যাম্পল মেকার',
    workerName: 'করিমা বেগম',
    company: 'মেঘনা এগ্রো অ্যান্ড ইন্ডাস্ট্রিয়াল মিলস',
  },
];

export const getApplicationsByWorkerId = (workerId) => {
  return applications.filter(a => a.workerId.toString() === workerId.toString() || a.workerId === parseInt(workerId));
};

export const getApplicationsByJobId = (jobId) => {
  return applications.filter(a => a.jobId.toString() === jobId.toString() || a.jobId === parseInt(jobId));
};

export const applicationStatuses = {
  applied: { label: 'আবেদন জমা পড়েছে', color: 'info', icon: '📤' },
  shortlisted: { label: 'বাছাইকৃত (শর্টলিস্টেড)', color: 'success', icon: '✓' },
  interview: { label: 'সাক্ষাৎকার আহ্বান', color: 'warning', icon: '👤' },
  accepted: { label: 'অনুমোদিত / গৃহীত', color: 'success', icon: '✓✓' },
  rejected: { label: 'বাতিলকৃত', color: 'error', icon: '✗' },
};
