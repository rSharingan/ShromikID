/**
 * Mock Certificates Data (Bangla)
 */
export const certificates = [
  {
    id: 1,
    name: 'ন্যাশনাল স্কিল স্ট্যান্ডার্ড বেসিক (এনএসএসবি) - ইলেকট্রিক্যাল',
    provider: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (বিটিইবি)',
    category: 'Electrical & Electronics',
    issueDate: '২০১৯-০৬-১৫',
    expiryDate: '২০২৯-০৬-১৫',
    credentialId: 'BTEB-RPL-2019-001234',
    verified: true,
    location: 'ঢাকা',
    workerId: 1,
  },
  {
    id: 2,
    name: 'ইন্ডাস্ট্রিয়াল সুইং মেশিন ও প্যাটার্ন মেকিং লেভেল-২',
    provider: 'বিজিএমইএ ইনস্টিটিউট অব ফ্যাশন অ্যান্ড টেকনোলজি',
    category: 'Tailoring & Garments',
    issueDate: '২০২১-০৩-১০',
    expiryDate: '২০৩১-০৩-১০',
    credentialId: 'BIFT-RMG-2021-005678',
    verified: true,
    location: 'চট্টগ্রাম',
    workerId: 2,
  },
];

export const getCertificatesByWorkerId = (workerId) => {
  return certificates.filter(c => c.workerId.toString() === workerId.toString() || c.workerId === parseInt(workerId));
};
