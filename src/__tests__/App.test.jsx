import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import App from '../App';

vi.mock('p5', async () => {
  const { MockP5 } = await import('../test-utils/mockP5');
  return { default: MockP5 };
});

const setScrollY = (value) => {
  Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
};

describe('App', () => {
  it('renders every page section', () => {
    renderWithProviders(<App />);

    expect(screen.getByText('ALEX MANNING')).toBeInTheDocument();
    for (const id of ['Home', 'About', 'Projects', 'Experience', 'Contact']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it('mounts the flow field background exactly once', async () => {
    const { MockP5 } = await import('../test-utils/mockP5');
    MockP5.instances = [];
    renderWithProviders(<App />);
    expect(MockP5.instances).toHaveLength(1);
  });

  it('syncs the dark class on <html> with the dark mode context', async () => {
    // matchMedia mock returns false => prefers light => dark class removed
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  it('updates the overlay opacity CSS variable on scroll with the original formula', async () => {
    renderWithProviders(<App />);

    const home = document.getElementById('Home');
    Object.defineProperty(home, 'offsetHeight', { value: 1000, configurable: true });

    // Halfway down the hero: (500 / 1000) * 0.6 + 0.3 = 0.6
    setScrollY(500);
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue('--dynamic-bg-opacity')
      ).toBe('0.6');
    });

    // Past the hero: clamps to 0.9
    setScrollY(1500);
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue('--dynamic-bg-opacity')
      ).toBe('0.9');
    });
  });

  it('does not re-render the page tree on scroll', async () => {
    renderWithProviders(<App />);

    const home = document.getElementById('Home');
    Object.defineProperty(home, 'offsetHeight', { value: 1000, configurable: true });

    const pagesWrapper = home.parentElement;
    const renderSpy = vi.fn();
    const observer = new MutationObserver(renderSpy);
    observer.observe(pagesWrapper, { childList: true, subtree: true, attributes: true });

    setScrollY(400);
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue('--dynamic-bg-opacity')
      ).not.toBe('');
    });

    observer.disconnect();
    expect(renderSpy).not.toHaveBeenCalled();
  });
});
