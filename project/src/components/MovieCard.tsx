import React from 'react';
import { Star, Users } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  isSelected: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, isSelected }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
      onClick={() => onSelect(movie)}
    >
      <img 
        src={movie.posterUrl} 
        alt={movie.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
        <p className="text-gray-300 text-sm">{movie.releaseYear}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{movie.averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-white text-sm">{movie.reviewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};