import typescript from '@rollup/plugin-typescript';
import css from "rollup-plugin-import-css";

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [typescript(), css()],
  external: ['react', 'react-dom', '@tiptap/react', '@radix-ui/react-dropdown-menu']
}