import React from 'react';
import { format } from 'date-fns';
import { Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  selectedCategory: string | null;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, selectedCategory }) => {
  const filteredReviews = selectedCategory 
    ? reviews.filter(review => review.category === selectedCategory)
    : reviews;

  const getSentimentIcon = (sentiment: Review['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {filteredReviews.map(review => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">{review.author}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {format(new Date(review.date), 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {review.category}
              </span>
              {getSentimentIcon(review.sentiment)}
            </div>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  );
};