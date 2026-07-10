import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import Home from '../pages/Home';
import Pages from '../Pages';
import ProjectCard from '../components/ProjectCard';

describe('Pages background overlay', () => {
  it('binds the overlay colour to the scroll-driven opacity variable (dark mode default)', () => {
    const { container } = renderWithProviders(<Pages />);
    const wrapper = container.querySelector('.pb-40');
    const color = wrapper.style.getPropertyValue('--dynamic-bg-color');
    expect(color).toContain('rgba(24, 24, 27');
    expect(color).toContain('var(--dynamic-bg-opacity, 0.3)');
    expect(wrapper.style.backgroundColor).toBe('var(--dynamic-bg-color)');
  });
});

describe('Home', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('fades the hero in after one second', () => {
    vi.useFakeTimers();
    render(<Home />);
    const hero = screen.getByText('ALEX MANNING').parentElement;
    expect(hero.className).toContain('opacity-0');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hero.className).toContain('opacity-100');
    vi.useRealTimers();
  });

  it('renders the four social links', () => {
    const { container } = render(<Home />);
    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://github.com/Tokeley',
      'mailto:alex.t.manning@gmail.com',
      'https://www.instagram.com/alex.manning_/',
      'https://www.linkedin.com/in/alex-manning-7993ab231/',
    ]);
  });
});

describe('ProjectCard', () => {
  const project = {
    title: 'Test Project',
    description: 'A description of the project.',
    technologies: ['React', 'Vite'],
    codeLink: 'https://example.com/code',
    liveLink: 'https://example.com/live',
    liveLinkText: 'Visit Now',
    imageLink: 'resources/test.png',
  };

  it('lazy-loads and async-decodes the project image', () => {
    renderWithProviders(<ProjectCard project={project} />);
    const img = screen.getByAltText('Test Project');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img).toHaveAttribute('src', 'resources/test.png');
  });

  it('renders title, description, badges and both links', () => {
    const { container } = renderWithProviders(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A description of the project.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();

    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining(['https://example.com/code', 'https://example.com/live']));
  });

  it('omits link buttons when the project has none', () => {
    const bare = { ...project, codeLink: '', liveLink: '' };
    const { container } = renderWithProviders(<ProjectCard project={bare} />);
    expect(container.querySelectorAll('a')).toHaveLength(0);
  });
});
