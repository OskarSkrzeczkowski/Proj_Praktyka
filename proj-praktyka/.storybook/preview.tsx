import type { Preview } from "@storybook/react";
// @ts-ignore
import '../src/index.css'; 

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme'; 

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div className="min-h-screen bg-[#050725] p-8 flex items-center justify-center">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;