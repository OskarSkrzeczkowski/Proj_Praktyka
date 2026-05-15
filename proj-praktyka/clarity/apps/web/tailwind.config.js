const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-400',
    'bg-red-900', 'bg-blue-900', 'bg-green-900', 'bg-yellow-900',
    'border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500'
  ],
  plugins: [],
};
