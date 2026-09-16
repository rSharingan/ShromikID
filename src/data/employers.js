/**
 * Mock Employers Data (Bangla)
 */
export const employers = [
  {
    id: 1,
    name: 'এবিসি কনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট লি.',
    owner: 'প্রকৌশলী ফারহান চৌধুরী',
    location: 'ঢাকা',
    businessType: 'নির্মাণ ও সিভিল ইঞ্জিনিয়ারিং',
    verified: true,
    rating: 4.9,
    workersHired: 45,
    activeJobs: 2,
  },
  {
    id: 2,
    name: 'মেঘনা এগ্রো অ্যান্ড ইন্ডাস্ট্রিয়াল মিলস',
    owner: 'তানভীর হাসান',
    location: 'চট্টগ্রাম',
    businessType: 'ম্যানুফ্যাকচারিং ও কৃষি শিল্প',
    verified: true,
    rating: 4.8,
    workersHired: 120,
    activeJobs: 2,
  },
];

/**
 * Get employer by ID
 */
export const getEmployerById = (id) => {
  return employers.find(e => e.id.toString() === id.toString() || e.id === parseInt(id));
};
