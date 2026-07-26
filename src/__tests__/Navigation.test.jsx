import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';

const setScrollY = (value) => {
  Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
};

// Give each fixture <section> a fake position: i * 1000 tall blocks
const layoutSections = (container) => {
  container.querySelectorAll('section').forEach((section, i) => {
    Object.defineProperty(section, 'offsetTop', { value: i * 1000, configurable: true });
    Object.defineProperty(section, 'clientHeight', { value: 900, configurable: true });
  });
};

const Fixture = ({ children }) => (
  <div>
    <section id="Home" />
    <section id="About" />
    <section id="Projects" />
    <section id="Experience" />
    <section id="Contact" />
    {children}
  </div>
);

describe('Navigation (desktop)', () => {
  it('moves the active bar to the section under the scroll position', async () => {
    setScrollY(0);
    const { container } = render(
      <Fixture>
        <Navigation />
      </Fixture>
    );
    layoutSections(container);
    const bar = container.querySelector('.bar');

    setScrollY(2500); // inside section index 2 (Projects)
    fireEvent.scroll(window);
    await waitFor(() => expect(bar.style.top).toBe('128px'));

    setScrollY(4200); // inside section index 4 (Contact)
    fireEvent.scroll(window);
    await waitFor(() => expect(bar.style.top).toBe('256px'));
  });

  it('renders links to all five sections', () => {
    const { container } = render(
      <Fixture>
        <Navigation />
      </Fixture>
    );
    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining(['#Home', '#About', '#Projects', '#Experience', '#Contact'])
    );
  });

  it('only reveals a label on hover over its own button, not the label area (peer, not group)', () => {
    const { container } = render(
      <Fixture>
        <Navigation />
      </Fixture>
    );
    const links = [...container.querySelectorAll('a[href^="#"]')];
    const labels = [...container.querySelectorAll('span.opacity-0')];
    expect(links).toHaveLength(5);
    expect(labels).toHaveLength(5);

    links.forEach((link) => {
      // The trigger must be scoped to the button (peer), not a shared
      // ancestor (group) that also covers the label's own hitbox -
      // otherwise hovering where the (invisible) label sits also reveals it.
      expect(link.className).toContain('peer');
      expect(link.closest('.group')).toBeNull();
    });

    labels.forEach((label) => {
      expect(label.className).toContain('peer-hover:opacity-100');
      expect(label.className).not.toContain('group-hover:opacity-100');
    });
  });
});

describe('NavigationMobile', () => {
  it('moves the active bar horizontally on scroll', async () => {
    setScrollY(0);
    const { container } = render(
      <Fixture>
        <NavigationMobile />
      </Fixture>
    );
    layoutSections(container);
    const bar = container.querySelector('.barMobile');

    setScrollY(1500); // inside section index 1 (About)
    fireEvent.scroll(window);
    await waitFor(() => expect(bar.style.left).toBe('64px'));
  });
});
