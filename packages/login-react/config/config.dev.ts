import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    API_SERVER: process.env.API_SERVER || 'http://qinrundev:3001',
  },
});
