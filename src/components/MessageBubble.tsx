import type { Movie, SearchResult } from '../types/movie';

export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text?: string;
    results?: SearchResult[];
    movie?: Movie;
    isLoading?: boolean;
}

interface Props {
    message: ChatMessage;
    onSelectMovie?: (url: string) => void;
}

export function MessageBubble({ message, onSelectMovie }: Props) {
    const isUser = message.sender === 'user';

    return (
        <div className={`message-wrapper ${isUser ? 'user' : 'bot'}`}>
            <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
                {message.text && <p className="message-text">{message.text}</p>}
                {message.isLoading && <div className="typing-indicator"><span>.</span><span>.</span><span>.</span></div>}

                {message.results && message.results.length > 0 && (
                    <div className="search-results-list">
                        {message.results.map((result, idx) => (
                            <div
                                key={idx}
                                className="search-result-item"
                                onClick={() => onSelectMovie && onSelectMovie(result.url)}
                            >
                                {result.thumbnail && <img src={result.thumbnail} alt={result.title} className="result-thumb" />}
                                <div className="result-info">
                                    <h4>{result.title}</h4>
                                    <span className="action-text">Tap to get links</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {message.movie && (
                    <div className="movie-details-card">
                        <h4>{message.movie.title}</h4>
                        {message.movie.year && <span className="movie-year">{message.movie.year}</span>}
                        {message.movie.thumbnailUrls?.[0] && (
                            <img src={message.movie.thumbnailUrls[0]} alt={message.movie.title} className="movie-poster" />
                        )}
                        {message.movie.description && <p className="movie-desc">{message.movie.description}</p>}

                        {message.movie.availableLinks && message.movie.availableLinks.length > 0 && (
                            <div className="download-links">
                                <h5>Download Links</h5>
                                {message.movie.availableLinks.map((link, idx) => (
                                    <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="dl-btn">
                                        {link.label || 'Download'}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
