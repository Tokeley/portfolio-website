import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import { MockAudio } from '../setupTests';
import emailjs from '@emailjs/browser';
import Contact from '../pages/Contact';

vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(() => Promise.resolve({ status: 200 })),
  },
}));

const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
    target: { name: 'firstName', value: 'Jane' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), {
    target: { name: 'lastName', value: 'Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Email'), {
    target: { name: 'email', value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Subject'), {
    target: { name: 'subject', value: 'Hello' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Message'), {
    target: { name: 'message', value: 'Nice site!' },
  });
};

describe('Contact form', () => {
  beforeEach(() => {
    emailjs.send.mockClear();
  });

  it('sends the form values through emailjs and confirms', async () => {
    renderWithProviders(<Contact />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(screen.getByText('Sent!')).toBeInTheDocument());

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    const params = emailjs.send.mock.calls[0][2];
    expect(params).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      subject: 'Hello',
      message: 'Nice site!',
    });
  });

  it('clears the form after submitting', async () => {
    renderWithProviders(<Contact />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() =>
      expect(screen.getByPlaceholderText('Enter First Name')).toHaveValue('')
    );
  });

  it('does not construct audio objects while typing (muted default)', () => {
    renderWithProviders(<Contact />);
    fillForm();
    expect(MockAudio.instances).toHaveLength(0);
  });
});
