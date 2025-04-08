import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Review, ReviewCategory } from '../types';

interface AddReviewFormProps {
  movieId: string;
  onSubmit: (review: Omit<Review, 'id' | 'date' | 'sentiment'>) => void;
}

export const AddReviewForm: React.FC<AddReviewFormProps> = ({ movieId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ReviewCategory>('Overall');
  const [author, setAuthor] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const categories: ReviewCategory[] = ['Acting', 'Plot', 'Visuals', 'Sound', 'Pacing', 'Overall'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating && content && category && author) {
      onSubmit({
        movieId,
        rating,
        content,
        category,
        author
      });
      setRating(0);
      setContent('');
      setCategory('Overall');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                value <= (hoveredRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ReviewCategory)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        disabled={!rating || !content || !author}
      >
        Submit Review
      </button>
    </form>
  );
};