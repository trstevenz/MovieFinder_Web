import { useEffect, useRef } from 'react';
import { MessageBubble, type ChatMessage } from './MessageBubble';

interface Props {
    messages: ChatMessage[];
    onSelectMovie: (url: string) => void;
}

export function ChatContainer({ messages, onSelectMovie }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            {messages.length === 0 ? (
                <div className="chat-empty-state">
                    <div className="bot-avatar">🤖</div>
                    <h2>Movie Bot</h2>
                    <p>Hi! Type a movie name below to search and get direct download links.</p>
                </div>
            ) : (
                <div className="chat-messages">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} onSelectMovie={onSelectMovie} />
                    ))}
                    <div ref={bottomRef} />
                </div>
            )}
        </div>
    );
}
