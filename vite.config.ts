import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
    resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'), // Map '@src' to the absolute path of the 'src' directory
      // Add other aliases here if needed, e.g., '@': path.resolve(__dirname, './src')
    },
  },
})
