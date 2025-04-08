import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Review } from '../types';

interface ReviewAnalyticsProps {
  reviews: Review[];
}

export const ReviewAnalytics: React.FC<ReviewAnalyticsProps> = ({ reviews }) => {
  const categoryData = useMemo(() => {
    const data: Record<string, { category: string; positive: number; negative: number; neutral: number }> = {};
    
    reviews.forEach(review => {
      if (!data[review.category]) {
        data[review.category] = {
          category: review.category,
          positive: 0,
          negative: 0,
          neutral: 0
        };
      }
      data[review.category][review.sentiment]++;
    });

    return Object.values(data);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const distribution = Array(5).fill(0).map((_, i) => ({
      rating: i + 1,
      count: 0
    }));

    reviews.forEach(review => {
      distribution[review.rating - 1].count++;
    });

    return distribution;
  }, [reviews]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Review Analytics</h3>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Category Sentiment Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill="#22c55e" stackId="stack" name="Positive" />
              <Bar dataKey="negative" fill="#ef4444" stackId="stack" name="Negative" />
              <Bar dataKey="neutral" fill="#94a3b8" stackId="stack" name="Neutral" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Rating Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratingDistribution}>
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Number of Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">
              Positive Reviews
            </div>
            <div className="text-2xl font-bold text-green-700">
              {reviews.filter(r => r.sentiment === 'positive').length}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-red-600 font-semibold">
              Negative Reviews
            </div>
            <div className="text-2xl font-bold text-red-700">
              {reviews.filter(r => r.sentiment === 'negative').length}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-600 font-semibold">
              Neutral Reviews
            </div>
            <div className="text-2xl font-bold text-gray-700">
              {reviews.filter(r => r.sentiment === 'neutral').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};