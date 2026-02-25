import { useEffect, useState, useRef } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { type ChatMessage } from './components/MessageBubble';
import './App.css';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<string>('Connecting...');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let timeoutId: number;
    let isMounted = true;

    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const defaultWsUrl = isLocalhost ? `ws://localhost:3000` : `${protocol}//${window.location.host}/ws`;

      const wsUrl = import.meta.env.VITE_WS_URL || defaultWsUrl;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;
        setStatus('Online');
      };

      ws.onclose = () => {
        if (!isMounted) return;
        setStatus('Offline');
        timeoutId = window.setTimeout(connect, 3000);
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const message = JSON.parse(event.data);
          handleMessage(message);
        } catch (e) {
          console.error("Invalid JSON", event.data);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
      if (wsRef.current) {
        wsRef.current.onclose = null; // Prevent triggering reconnect loop
        wsRef.current.close();
      }
    };
  }, []);

  const handleMessage = (msg: any) => {
    if (msg.type === 'search_results') {
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isLoading);
        return [...filtered, {
          id: Date.now().toString() + Math.random(),
          sender: 'bot',
          text: msg.data.length > 0 ? `Found ${msg.data.length} results. Tap one to get download links.` : "No movies found. Try another search.",
          results: msg.data
        }];
      });
    } else if (msg.type === 'movie_update') {
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isLoading);
        return [...filtered, {
          id: Date.now().toString() + Math.random(),
          sender: 'bot',
          movie: msg.data
        }];
      });
    } else if (msg.type === 'error') {
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isLoading);
        return [...filtered, {
          id: Date.now().toString() + Math.random(),
          sender: 'bot',
          text: `Error: ${msg.data.message}`
        }];
      });
    }
  };

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString() + '_user',
      sender: 'user',
      text
    };

    const loadingMsg: ChatMessage = {
      id: Date.now().toString() + '_loading',
      sender: 'bot',
      isLoading: true
    };

    setMessages(prev => [...prev, userMsg, loadingMsg]);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'search', query: text }));
    }
  };

  const handleSelectMovie = (url: string) => {
    const loadingMsg: ChatMessage = {
      id: Date.now().toString() + '_loading',
      sender: 'bot',
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMsg]);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'get_details', url }));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="bot-avatar-small">🤖</div>
          <div className="header-info">
            <h1>Movie Finder</h1>
            <span className={`status-indicator ${status.toLowerCase()}`}>
              <span className="dot"></span>
              {status}
            </span>
          </div>
        </div>
      </header>

      <main className="chat-main">
        <ChatContainer messages={messages} onSelectMovie={handleSelectMovie} />
      </main>

      <footer className="chat-footer">
        <ChatInput onSend={handleSend} disabled={status !== 'Online'} />
      </footer>
    </div>
  );
}

export default App;
