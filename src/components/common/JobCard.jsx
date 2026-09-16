import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, BadgeCheck } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import {
  formatBengaliCurrency,
  formatBengaliDate,
  translateLocation,
  translateSalaryType,
  toBengaliNumber,
} from '../../utils/formatters';

/**
 * JobCard Component
 * @param {Object} props
 * @param {Object} props.job - Job data
 */
const JobCard = ({
  job,
}) => {
  const companyName = job.company || job.employer?.employerProfile?.companyName || job.employer?.name || 'যাচাইকৃত প্রতিষ্ঠান';
  const rawLocation = job.location || (job.district ? `${job.district}${job.division ? `, ${job.division}` : ''}` : 'বাংলাদেশ');
  const locationText = rawLocation.split(',').map(part => translateLocation(part.trim())).join(', ');
  
  const salaryMin = job.salary?.min ?? job.salaryMin;
  const salaryMax = job.salary?.max ?? job.salaryMax;
  const salaryTypeText = translateSalaryType(job.salaryType || (job.jobType === 'daily' ? 'daily' : 'monthly'));

  return (
    <Card hover className="h-full flex flex-col group/card border border-gray-100 hover:border-emerald-200">
      <div className="space-y-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-lg group-hover/card:text-emerald-700 transition-colors duration-300">{job.title}</h3>
              {(job.verified || job.employer?.verificationStatus === 'verified') && (
                <BadgeCheck size={16} className="text-emerald-600 flex-shrink-0 animate-pulse" />
              )}
            </div>
            <p className="text-sm text-gray-600 group-hover/card:text-emerald-700 transition-colors duration-300 font-medium">{companyName}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2 group-hover/card:text-gray-900 transition-colors duration-300">
            <MapPin size={16} className="text-emerald-600 flex-shrink-0" />
            {locationText}
          </div>
          {(salaryMin || salaryMax) && (
            <div className="flex items-center gap-2 group-hover/card:text-gray-900 transition-colors duration-300">
              <DollarSign size={16} className="text-emerald-600 flex-shrink-0" />
              <span className="font-semibold text-slate-800">
                {salaryMin ? formatBengaliCurrency(salaryMin) : ''}
                {salaryMax ? ` - ${formatBengaliCurrency(salaryMax)}` : ''}
                {salaryTypeText}
              </span>
            </div>
          )}
          {(job.postedTime || job.createdAt) && (
            <div className="flex items-center gap-2 group-hover/card:text-gray-900 transition-colors duration-300">
              <Clock size={16} className="text-teal-600 flex-shrink-0" />
              {job.createdAt ? formatBengaliDate(job.createdAt) : job.postedTime}
            </div>
          )}
        </div>

        {/* Tags */}
        {job.skills && job.skills.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">প্রয়োজনীয় দক্ষতা</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <Badge key={idx} variant="info" className="text-xs hover:-translate-y-0.5 transition-transform bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {typeof skill === 'object' ? skill.name : skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="pt-4 border-t border-gray-100 mt-4">
        <Link to={`/jobs/${job.id}`} className="w-full block">
          <Button fullWidth variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">
            সার্কুলার দেখুন
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default JobCard;
