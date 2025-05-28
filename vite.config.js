// vite.config.js
import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material',
      '@mui/icons-material',
      '@mui/x-charts',
      '@mui/material/styles'],
  },
}
