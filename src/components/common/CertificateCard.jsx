import React from 'react';
import { Clock, MapPin, Award } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

/**
 * CertificateCard Component
 * @param {Object} props
 * @param {Object} props.certificate - Certificate data
 */
const CertificateCard = ({
  certificate,
}) => {
  return (
    <Card className="h-full">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Award size={24} className="text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">{certificate.name}</h3>
              <p className="text-sm text-gray-600">{certificate.provider}</p>
            </div>
          </div>
          {certificate.verified && (
            <Badge variant="success" className="text-xs flex-shrink-0 bg-emerald-100 text-emerald-800">
              যাচাইকৃত
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600">
          {certificate.issueDate && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="flex-shrink-0 text-slate-400" />
              <span>ইস্যু তারিখ: {certificate.issueDate}</span>
            </div>
          )}
          {certificate.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="flex-shrink-0 text-slate-400" />
              {certificate.location}
            </div>
          )}
        </div>

        {/* Credential ID */}
        {certificate.credentialId && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-1">সার্টিফিকেট নম্বর / ক্রেডেনশিয়াল আইডি</p>
            <p className="text-xs font-mono text-gray-700 break-all">
              {certificate.credentialId}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CertificateCard;
