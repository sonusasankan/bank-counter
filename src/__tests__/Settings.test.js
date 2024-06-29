import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '@/components/Settings';

describe('Settings component', () => {
  const initialCounters = [
    { id: 1, processing: 0, processed: [], processingTime: 4000 },
    { id: 2, processing: 0, processed: [], processingTime: 3000 },
    { id: 3, processing: 0, processed: [], processingTime: 2000 },
    { id: 4, processing: 0, processed: [], processingTime: 1000 },
  ];

  const mockFormSubmit = jest.fn();

  it('renders correctly', () => {
    render(<Settings counters={initialCounters} formSubmit={mockFormSubmit} />);
    expect(screen.getByText('Counter 1')).toBeInTheDocument();
    expect(screen.getByText('Counter 2')).toBeInTheDocument();
    expect(screen.getByText('Counter 3')).toBeInTheDocument();
    expect(screen.getByText('Counter 4')).toBeInTheDocument();
  });

  it('handles changing processing time', () => {
    render(<Settings counters={initialCounters} formSubmit={mockFormSubmit} />);

    const input = screen.getByLabelText('Processing time(seconds)', {
      selector: `input[name="1"]`
    });

    fireEvent.change(input, { target: { value: '5', name: '1' } });

    expect(input.value).toBe('5');
  });

  it('handles changing waitlist value', () => {
    render(<Settings counters={initialCounters} formSubmit={mockFormSubmit} />);

    const waitlistInput = screen.getByLabelText('Add people', { selector: 'input' });

    fireEvent.change(waitlistInput, { target: { value: '10' } });

    expect(waitlistInput.value).toBe('10');
  });

  it('handles form submission', () => {
    render(<Settings counters={initialCounters} formSubmit={mockFormSubmit} />);

    const submitButton = screen.getByText('Set');

    fireEvent.click(submitButton);

    expect(mockFormSubmit).toHaveBeenCalledWith(
      initialCounters.map(counter => ({ ...counter, processed: [] })),
      0
    );
  });
});
