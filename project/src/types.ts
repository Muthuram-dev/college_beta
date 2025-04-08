export interface Review {
  id: string;
  movieId: string;
  rating: number;
  content: string;
  category: ReviewCategory;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
  author: string;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  releaseYear: number;
  averageRating: number;
  reviewCount: number;
}

export type ReviewCategory = 
  | 'Acting'
  | 'Plot'
  | 'Visuals'
  | 'Sound'
  | 'Pacing'
  | 'Overall';