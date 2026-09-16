import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import Card from './Card';
import Avatar from './Avatar';

/**
 * ReviewCard Component
 * @param {Object} props
 * @param {Object} props.review - Review data
 */
const ReviewCard = ({
  review,
}) => {
  return (
    <Card>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={review.avatar} name={review.authorName} size="md" />
            <div>
              <p className="font-semibold text-gray-900">{review.authorName}</p>
              <p className="text-xs text-gray-600">{review.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                size={16}
                className={idx < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs text-gray-500">
          <span>{review.date}</span>
          {review.verified && (
            <span className="text-emerald-600 font-medium">✓ যাচাইকৃত পর্যালোচনা</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
