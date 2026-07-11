import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockAudio } from '../setupTests';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import { SoundContext } from '../contexts/SoundContext';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import { Provider } from '../components/ui/provider';
import MuteSwitch from '../components/MuteSwitch';
import DarkModeSwitch from '../components/DarkModeSwitch';
import SoundWidget from '../components/SoundWidget';

const soundContext = (overrides = {}) => ({
  muted: true,
  setMuted: vi.fn(),
  isMobile: false,
  setIsMobile: vi.fn(),
  ...overrides,
});

describe('MuteSwitch', () => {
  it('does not construct Audio objects on render, only on first click', () => {
    const { container, rerender } = renderWithProviders(<MuteSwitch />);
    rerender(<MuteSwitch />);
    expect(MockAudio.instances).toHaveLength(0);

    fireEvent.click(container.querySelector('a'));
    expect(MockAudio.instances).toHaveLength(2); // on + off, created once

    fireEvent.click(container.querySelector('a'));
    expect(MockAudio.instances).toHaveLength(2); // reused on later clicks
  });

  it('toggles between muted and unmuted icons', () => {
    const { container } = renderWithProviders(<MuteSwitch />);
    expect(container.querySelector('[data-testid="icon-muted"]')).toBeInTheDocument();

    fireEvent.click(container.querySelector('a'));
    expect(container.querySelector('[data-testid="icon-unmuted"]')).toBeInTheDocument();
  });
});

describe('DarkModeSwitch', () => {
  const renderSwitch = (ctx) =>
    render(
      <Provider>
        <SoundContext.Provider value={ctx}>
          <DarkModeProvider>
            <DarkModeSwitch />
          </DarkModeProvider>
        </SoundContext.Provider>
      </Provider>
    );

  it('toggles the icon and plays no sound while muted', () => {
    const { container } = renderSwitch(soundContext({ muted: true }));
    expect(container.querySelector('[data-testid="icon-moon"]')).toBeInTheDocument();

    fireEvent.click(container.querySelector('a'));
    expect(container.querySelector('[data-testid="icon-sun"]')).toBeInTheDocument();
    expect(MockAudio.instances).toHaveLength(0);
  });

  it('plays the light-off sound when leaving dark mode unmuted', () => {
    const { container } = renderSwitch(soundContext({ muted: false }));
    fireEvent.click(container.querySelector('a'));

    const played = MockAudio.instances.filter((a) => !a.paused);
    expect(played).toHaveLength(1);
    expect(played[0].src).toContain('LightOff');
  });
});

describe('SoundWidget', () => {
  const renderWidget = (ctx = soundContext({ muted: false })) => {
    const Wrapper = () => {
      const [index, setIndex] = useState(0);
      return (
        <SoundWidget currentTrackIndex={index} setCurrentTrackIndex={setIndex} />
      );
    };
    return render(
      <Provider>
        <SoundContext.Provider value={ctx}>
          <DarkModeProvider>
            <Wrapper />
          </DarkModeProvider>
        </SoundContext.Provider>
      </Provider>
    );
  };

  it('creates a single background track and shows its title once playing', async () => {
    renderWidget();
    await waitFor(() => expect(screen.getByText('Ethereal Forest')).toBeInTheDocument());
    expect(MockAudio.instances).toHaveLength(1);
    expect(MockAudio.instances[0].src).toContain('Ethereal-Forest');
    expect(MockAudio.instances[0].loop).toBe(true);
  });

  it('cycles to the next track on the forward control', async () => {
    const { container } = renderWidget();
    await waitFor(() => expect(screen.getByText('Ethereal Forest')).toBeInTheDocument());

    fireEvent.click(container.querySelector('[data-testid="icon-forward"]'));
    await waitFor(() => expect(screen.getByText('Fractal River')).toBeInTheDocument());

    const trackAudios = MockAudio.instances.filter((a) => a.src.includes('mp3') && !a.src.includes('Click'));
    expect(trackAudios).toHaveLength(2);
    expect(trackAudios[1].src).toContain('Fractal-River');
  });

  it('wraps backwards from the first track to the last', async () => {
    const { container } = renderWidget();
    await waitFor(() => expect(screen.getByText('Ethereal Forest')).toBeInTheDocument());

    fireEvent.click(container.querySelector('[data-testid="icon-backward"]'));
    await waitFor(() => expect(screen.getByText('Calm Park')).toBeInTheDocument());
  });

  it('pauses the current track when muted', async () => {
    const ctx = soundContext({ muted: false });
    const view = renderWidget(ctx);
    await waitFor(() => expect(MockAudio.instances[0].paused).toBe(false));

    view.rerender(
      <Provider>
        <SoundContext.Provider value={soundContext({ muted: true })}>
          <DarkModeProvider>
            <SoundWidget currentTrackIndex={0} setCurrentTrackIndex={vi.fn()} />
          </DarkModeProvider>
        </SoundContext.Provider>
      </Provider>
    );
    await waitFor(() => expect(MockAudio.instances[0].paused).toBe(true));
  });
});
