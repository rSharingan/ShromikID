import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Button, Input, Select, JobCard, EmptyState, LoadingState } from '../../components/common';
import { Search, MapPin, DollarSign, Filter, RefreshCw } from 'lucide-react';
import { jobsService } from '../../services/api';
import { jobs as fallbackJobs } from '../../data/jobs';

const JobsListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    jobType: '',
  });
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobsService.getJobs({
        search: searchTerm,
        category: filters.category,
        district: filters.location,
        employmentType: filters.jobType,
      });

      if (res.success && res.data && res.data.length > 0) {
        setAllJobs(res.data);
        setFilteredJobs(res.data);
      } else {
        setAllJobs(fallbackJobs);
        setFilteredJobs(fallbackJobs);
      }
    } catch (error) {
      console.warn('Could not fetch from backend API, using local mock data:', error.message);
      setAllJobs(fallbackJobs);
      setFilteredJobs(fallbackJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };

  const applyFilters = (activeFilters, query) => {
    let results = allJobs.filter((job) => {
      const company = job.company || job.employer?.employerProfile?.companyName || job.employer?.name || '';
      const location = job.location || job.district || '';
      const category = job.category || '';
      const jobType = job.jobType || job.employmentType || '';

      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = !activeFilters.location || location === activeFilters.location;
      const matchesCategory = !activeFilters.category || category === activeFilters.category;
      const matchesJobType = !activeFilters.jobType || jobType === activeFilters.jobType;

      return matchesSearch && matchesLocation && matchesCategory && matchesJobType;
    });

    setFilteredJobs(results);
  };

  const categories = [
    { value: '', label: 'সকল পেশা / ক্যাটাগরি' },
    { value: 'Electrical & Electronics', label: 'ইলেকট্রিক্যাল ও ইলেকট্রনিক্স' },
    { value: 'Construction & Masonry', label: 'নির্মাণ ও রাজমিস্ত্রি' },
    { value: 'Tailoring & Garments', label: 'দর্জি ও গার্মেন্টস' },
    { value: 'Transport & Driving', label: 'পরিবহন ও ড্রাইভিং' },
    { value: 'Plumbing & Sanitation', label: 'প্লাম্বিং ও স্যানিটারি' },
    { value: 'Carpentry & Woodwork', label: 'কাঠমিস্ত্রি ও ফার্নিচার' },
  ];

  const locations = [
    { value: '', label: 'সকল জেলা' },
    { value: 'Dhaka', label: 'ঢাকা' },
    { value: 'Chittagong', label: 'চট্টগ্রাম' },
    { value: 'Sylhet', label: 'সিলেট' },
    { value: 'Khulna', label: 'খুলনা' },
    { value: 'Rajshahi', label: 'রাজশাহী' },
    { value: 'Barisal', label: 'বরিশাল' },
    { value: 'Rangpur', label: 'রংপুর' },
  ];

  const jobTypes = [
    { value: '', label: 'সকল কাজের ধরন' },
    { value: 'full-time', label: 'ফুল-টাইম (স্থায়ী)' },
    { value: 'part-time', label: 'পার্ট-টাইম' },
    { value: 'contract', label: 'চুক্তিভিত্তিক (প্রজেক্ট)' },
    { value: 'daily', label: 'দৈনিক হাজিরাভিত্তিক' },
  ];

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">কাজের সার্কুলার তালিকা</h1>
            <p className="text-emerald-100 text-sm sm:text-base">
              আপনার দক্ষতার সাথে মানানসই বিশ্বস্ত ও যাচাইকৃত কাজের সুযোগ খুঁজুন
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-24 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <label className="flex items-center gap-2 font-bold text-slate-900">
                    <Filter size={18} className="text-emerald-600" />
                    ফিল্টার সমূহ
                  </label>
                  <button
                    onClick={fetchJobs}
                    className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> রিফ্রেশ
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">অনুসন্ধান</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="কাজের শিরোনাম বা কোম্পানি..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        applyFilters(filters, e.target.value);
                      }}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <Select
                  label="পেশা / ক্যাটাগরি"
                  options={categories}
                  value={filters.category}
                  onChange={handleFilterChange}
                  name="category"
                />

                <Select
                  label="অবস্থান / জেলা"
                  options={locations}
                  value={filters.location}
                  onChange={handleFilterChange}
                  name="location"
                />

                <Select
                  label="কাজের ধরন"
                  options={jobTypes}
                  value={filters.jobType}
                  onChange={handleFilterChange}
                  name="jobType"
                />

                {(filters.location || filters.category || filters.jobType || searchTerm) && (
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      setFilters({ location: '', category: '', jobType: '' });
                      setSearchTerm('');
                      setFilteredJobs(allJobs);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600"
                  >
                    ফিল্টার রিসেট করুন
                  </Button>
                )}
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  মোট {filteredJobs.length} টি সার্কুলার পাওয়া গেছে
                </h2>
              </div>

              {loading ? (
                <div className="py-12 bg-white rounded-3xl border border-slate-200">
                  <LoadingState message="লাইভ ডাটাবেজ থেকে সার্কুলার লোড হচ্ছে..." />
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="grid gap-5">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="কোনো সার্কুলার পাওয়া যায়নি"
                  description="আপনার ফিল্টার বা অনুসন্ধান শব্দ পরিবর্তন করে আবার চেষ্টা করুন।"
                  action={
                    <Button
                      onClick={() => {
                        setFilters({ location: '', category: '', jobType: '' });
                        setSearchTerm('');
                        setFilteredJobs(allJobs);
                      }}
                      className="bg-emerald-600 text-white rounded-full text-xs font-bold"
                    >
                      ফিল্টার রিসেট করুন
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default JobsListPage;
