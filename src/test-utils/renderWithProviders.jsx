import { render } from '@testing-library/react';
import { Provider } from '../components/ui/provider';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import { SoundProvider } from '../contexts/SoundContext';

// Mirrors the provider stack in main.jsx
export const renderWithProviders = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider>
        <SoundProvider>
          <DarkModeProvider>{children}</DarkModeProvider>
        </SoundProvider>
      </Provider>
    ),
    ...options,
  });
