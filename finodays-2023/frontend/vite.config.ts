import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { cjsInterop } from 'vite-plugin-cjs-interop'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    cjsInterop({
      dependencies: ['@emotion/styled/base', '@emotion/*'],
    }),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
})
