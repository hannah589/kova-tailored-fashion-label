// Import Vite's configuration helper
import { defineConfig } from 'vite'
// Import the React plugin for Vite
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // Enables React support
    react(),
  ],
  server: {
    //CLIENT SIDE PORT
    port: 3000,

    proxy: { 
      //SERVER SIDE PORT PROXY
      //Proxy API requests from Vite to Express
      //fetch("http://localhost:4000/api/auth/login") turns to fetch("/api/auth/login")
      '/api': {
        //not https. this is a testing server
        //location of the backend, express server
        target: "http://localhost:4000/api",
        //changes the http headers origin to the target server
        changeOrigin: true,
        //remove the secure
        //if true, verifies HTTP certificates
        secure: false,
      },
    },
  },
});