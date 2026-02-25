import React from 'react';
import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface LiveGridProps {
    movies: Movie[];
}

export const LiveGrid: React.FC<LiveGridProps> = ({ movies }) => {
    return (
        <div className="live-grid">
            {movies.map((movie, index) => (
                <MovieCard key={`${movie.title}-${index}`} movie={movie} />
            ))}
        </div>
    );
};
