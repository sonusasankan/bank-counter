import { render, screen, fireEvent, act } from '@testing-library/react';
import ClientHome from '@/components/ClientHome.jsx';
import '@testing-library/jest-dom';

jest.mock('../components/Settings.jsx', () => () => <div>Mocked Settings</div>);
jest.mock('../components/CounterTable', () => () => <div>Mocked CounterTable</div>);
jest.mock('../components/Waitlist', () => ({ waitlist, handleAddPeople, total }) => (
  <div>
    <div>Mocked Waitlist</div>
    <button onClick={handleAddPeople}>Add Person</button>
    <span>Total: {total}</span>
  </div>
));

// Adding displayName to ClientHome component
ClientHome.displayName = 'ClientHome';

describe('ClientHome component', () => {
  const initialData = [
    { id: 1, processing: 0, processed: [], processingTime: 4000 },
    { id: 2, processing: 0, processed: [], processingTime: 3000 },
    { id: 3, processing: 0, processed: [], processingTime: 2000 },
    { id: 4, processing: 0, processed: [], processingTime: 1000 },
  ];

  it('renders correctly', () => {
    render(<ClientHome initialData={initialData} />);
    expect(screen.getByText('Set Que')).toBeInTheDocument();
    expect(screen.getByText('SBC Bank Counter')).toBeInTheDocument();
    expect(screen.getByText('Mocked Settings')).toBeInTheDocument();
    expect(screen.getByText('Mocked CounterTable')).toBeInTheDocument();
    expect(screen.getByText('Mocked Waitlist')).toBeInTheDocument();
  });

  it('handles adding people to the waitlist', () => {
    render(<ClientHome initialData={initialData} />);

    expect(screen.getByText('Total: 0')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add Person'));

    expect(screen.getByText('Total: 1')).toBeInTheDocument();
  });

  it('processes people from the waitlist', async () => {
    render(<ClientHome initialData={initialData} />);

    fireEvent.click(screen.getByText('Add Person'));

    await act(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    expect(screen.getByText('Total: 1')).toBeInTheDocument();
  });
});
