import { Movie, Review } from '../types';
import { format } from 'date-fns';

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'Inception',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80',
    releaseYear: 2010,
    averageRating: 4.8,
    reviewCount: 15
  },
  {
    id: 'm2',
    title: 'The Shawshank Redemption',
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80',
    releaseYear: 1994,
    averageRating: 4.9,
    reviewCount: 20
  },
  {
    id: 'm3',
    title: 'Interstellar',
    posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80',
    releaseYear: 2014,
    averageRating: 4.7,
    reviewCount: 15
  }
];

const generateReviews = (): Review[] => {
  const reviews: Review[] = [];
  const categories: Array<Review['category']> = ['Acting', 'Plot', 'Visuals', 'Sound', 'Pacing', 'Overall'];
  const sentiments: Array<Review['sentiment']> = ['positive', 'negative', 'neutral'];
  
  movies.forEach(movie => {
    for (let i = 0; i < 15; i++) {
      const rating = Math.floor(Math.random() * 5) + 1;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const sentiment = rating > 3 ? 'positive' : rating < 3 ? 'negative' : 'neutral';
      
      reviews.push({
        id: `${movie.id}-review-${i}`,
        movieId: movie.id,
        rating,
        category,
        sentiment,
        content: generateReviewContent(category, sentiment),
        date: format(new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28)), 'yyyy-MM-dd'),
        author: `User${Math.floor(Math.random() * 1000)}`
      });
    }
  });
  
  return reviews;
};

const generateReviewContent = (category: Review['category'], sentiment: Review['sentiment']): string => {
  const reviews = {
    Acting: {
      positive: "The performances were absolutely stellar, particularly the lead actor who brought incredible depth to their character.",
      negative: "The acting felt forced and unconvincing, taking me out of the story multiple times.",
      neutral: "The acting was adequate, though nothing particularly memorable stood out."
    },
    Plot: {
      positive: "A masterfully crafted storyline with unexpected twists that kept me engaged throughout.",
      negative: "The plot had several holes and felt disjointed, making it hard to follow.",
      neutral: "The story was straightforward and predictable, but served its purpose."
    },
    Visuals: {
      positive: "Stunning cinematography and visual effects that created a truly immersive experience.",
      negative: "The visual effects looked cheap and dated, detracting from the overall experience.",
      neutral: "The visuals were standard for this type of film, neither impressive nor disappointing."
    },
    Sound: {
      positive: "The sound design and score enhanced every scene, creating perfect emotional resonance.",
      negative: "The sound mixing was poor, making dialogue difficult to hear at crucial moments.",
      neutral: "The soundtrack was appropriate but not particularly memorable."
    },
    Pacing: {
      positive: "Perfect pacing that kept me on the edge of my seat from start to finish.",
      negative: "The pacing dragged considerably in the middle, making it feel much longer than necessary.",
      neutral: "The pacing was steady, though some scenes could have been tightened up."
    },
    Overall: {
      positive: "A must-watch film that excels in every aspect of filmmaking.",
      negative: "Unfortunately, this film failed to meet expectations in several key areas.",
      neutral: "An okay movie that provides decent entertainment value."
    }
  };
  
  return reviews[category][sentiment];
};

export const initialReviews = generateReviews();