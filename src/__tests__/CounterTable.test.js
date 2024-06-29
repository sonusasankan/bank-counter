import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CounterTable from '@/components/CounterTable';

describe('CounterTable component', () => {
  const counters = [
    { id: 1, processing: 0, processed: [], processingTime: 4000 },
    { id: 2, processing: 0, processed: [], processingTime: 3000 },
    { id: 3, processing: 0, processed: [], processingTime: 2000 },
    { id: 4, processing: 0, processed: [], processingTime: 1000 },
  ];

  it('renders correctly', () => {
    render(<CounterTable counters={counters} />);
  
    // Check if table headers are rendered correctly
    expect(screen.getByRole('columnheader', { name: /Counter/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Processing/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Processed/i })).toBeInTheDocument();
  
    // Check all cells in the table
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(counters.length * 3); // Assuming each row has 3 cells
  
    // Alternatively, check specific cells if you know their exact placement
    // Example:
    // expect(cells[0]).toHaveTextContent('1'); // First cell content
  });
});
