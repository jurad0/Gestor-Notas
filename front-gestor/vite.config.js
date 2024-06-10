import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000, // Asegúrate de que este puerto está libre y es el correcto
    strictPort: true, // Si es true, Vite fallará si el puerto está ocupado
    hmr: {
      protocol: 'ws', // Usar 'wss' para WebSocket seguro si es necesario
      host: 'localhost',
      port: 3000, // Asegúrate de que este puerto coincide con el del servidor
    }
  }
});
