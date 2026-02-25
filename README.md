# Movie Finder Web UI

A standalone React frontend built with Vite for the Movie Finder application.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

By default, the Web UI will attempt to connect to a WebSocket server on the same host and port.

## Deployment Instructions

When deploying this frontend to a typical hosting provider (like Vercel, Netlify, or Cloudflare Pages), you'll need to link it to your backend API.

### 1. Configure the API URL
The application uses the `VITE_WS_URL` environment variable to connect to the backend WebSocket server. 

In your hosting provider's dashboard (e.g., Vercel Project Settings > Environment Variables), add the following variable:
- **Key**: `VITE_WS_URL`
- **Value**: `wss://your-backend-api-url.com/ws` *(Replace this with your actual backend WebSocket URL)*

### 2. Build Settings
For providers that require build configuration, use the following:
- **Framework Preset**: Vite (or React)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Once deployed, the Web UI will automatically connect to the backend server specified in `VITE_WS_URL`!
