// __tests__/Waitlist.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Waitlist from '@/components/Waitlist';

describe('Waitlist component', () => {
  const waitlist = [1, 2, 3];
  const total = 3;
  const mockHandleAddPeople = jest.fn();

  it('renders correctly', () => {
    render(<Waitlist waitlist={waitlist} handleAddPeople={mockHandleAddPeople} total={total} />);

    expect(screen.getByText(/Waitlist: \d+/)).toHaveTextContent(`Waitlist: ${waitlist.length}`);

    // Check if the button displays the correct next total
    const button = screen.getByRole('button', { name: `Next ${total + 1}` });
    expect(button).toBeInTheDocument();
  });

  it('calls handleAddPeople when button is clicked', () => {
    render(<Waitlist waitlist={waitlist} handleAddPeople={mockHandleAddPeople} total={total} />);

    // Click the button
    const button = screen.getByRole('button', { name: `Next ${total + 1}` });
    fireEvent.click(button);

    // Check if the function is called
    expect(mockHandleAddPeople).toHaveBeenCalled();
  });
});
