import React, { useState } from 'react';
import { Movie, Review, ReviewCategory } from './types';
import { movies, initialReviews } from './data/initialData';
import { MovieCard } from './components/MovieCard';
import { ReviewList } from './components/ReviewList';
import { AddReviewForm } from './components/AddReviewForm';
import { ReviewAnalytics } from './components/ReviewAnalytics';
import { BarChart, Film } from 'lucide-react';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedCategory, setSelectedCategory] = useState<ReviewCategory | null>(null);

  const categories: ReviewCategory[] = ['Acting', 'Plot', 'Visuals', 'Sound', 'Pacing', 'Overall'];

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'sentiment'>) => {
    const review: Review = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      sentiment: newReview.rating > 3 ? 'positive' : newReview.rating < 3 ? 'negative' : 'neutral'
    };

    setReviews([review, ...reviews]);

    // Update movie stats
    const updatedMovies = movies.map(movie => {
      if (movie.id === newReview.movieId) {
        const movieReviews = [...reviews, review].filter(r => r.movieId === movie.id);
        const avgRating = movieReviews.reduce((acc, r) => acc + r.rating, 0) / movieReviews.length;
        return {
          ...movie,
          averageRating: avgRating,
          reviewCount: movieReviews.length
        };
      }
      return movie;
    });

    const updatedMovie = updatedMovies.find(m => m.id === selectedMovie?.id);
    if (updatedMovie) {
      setSelectedMovie(updatedMovie);
    }
  };

  const filteredReviews = selectedMovie
    ? reviews.filter(review => review.movieId === selectedMovie.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CinemaPulse</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Select a Movie</h2>
            <div className="grid gap-4">
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={setSelectedMovie}
                  isSelected={selectedMovie?.id === movie.id}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedMovie ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Reviews for {selectedMovie.title}</h2>
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      {filteredReviews.length} reviews
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <ReviewAnalytics reviews={filteredReviews} />
                </div>

                <div className="mb-6">
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        selectedCategory === null
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <AddReviewForm
                      movieId={selectedMovie.id}
                      onSubmit={handleAddReview}
                    />
                  </div>
                  <div className="space-y-6">
                    <ReviewList
                      reviews={filteredReviews}
                      selectedCategory={selectedCategory}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">
                  Select a movie to see its reviews
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;