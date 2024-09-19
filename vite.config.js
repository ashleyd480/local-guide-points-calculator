import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// for local testing only!
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // configure proxy to intercept requests that start with this /api
      // we want to prefix with api otherwise may redirect home page to google
      '/api': {
        // proxy the local host to google so the headers match and no longer blocked
        target: 'https://www.google.com',
        // Origin header changed to google to match
        changeOrigin: true,
        // removes api prefix before sending request to server 
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})


// server.proxy: This section is where the proxy configuration is defined. It's used to proxy requests from your development server to another server. This helps with CORS issues by making it appear as though requests are coming from the same origin.