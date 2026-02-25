import React from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="movie-card">
            <div className="thumbnail-container">
                {movie.thumbnailUrls[0] ? (
                    <img src={movie.thumbnailUrls[0]} alt={movie.title} loading="lazy" />
                ) : (
                    <div className="placeholder">No Image</div>
                )}
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                {movie.year && <span className="year">{movie.year}</span>}
                {movie.description && <p className="description">{movie.description}</p>}
                <div className="links">
                    {movie.availableLinks.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
