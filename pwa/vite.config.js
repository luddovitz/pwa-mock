import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	plugins: [
    sveltekit(),
      mkcert()
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  }
});
