import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@client': './src/',
            '@tests': './tests/'
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                secure: false,
                ws: true,
            }
        }
    }
});
