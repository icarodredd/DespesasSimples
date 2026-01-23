import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

jest.mock('lucide-react', () => ({
  Receipt: () => <svg data-testid='receipt-icon'></svg>,
}));

describe('EmptyState', () => {
  const mockedMessage = 'No data available';
  it('renders the message correctly', () => {
    render(<EmptyState message={mockedMessage} />);

    const message = screen.getByText(mockedMessage);

    expect(message).toBeInTheDocument();
  });

  it('renders the icon correctly', () => {
    render(<EmptyState message={mockedMessage} />);

    const icon = screen.getByTestId('receipt-icon');

    expect(icon).toBeInTheDocument();
  });
});
