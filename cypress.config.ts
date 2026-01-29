import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        createBundler({ sourcemap: 'inline', tsconfig: 'tsconfig.json' }),
      );
      return config;
    },
  },
});
