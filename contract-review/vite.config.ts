import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        disabled: false
    },
    build: {
        commonjsOptions: {
            include: [],
            transformMixedEsModules: true
        }
    },
    plugins: [react()],
})



