import { render, screen } from '@testing-library/react';
import { FAB } from './FAB';
import userEvent from '@testing-library/user-event';

describe('FAB', () => {
  const mockOnClick = jest.fn();
  const user = userEvent.setup();

  it('should display the button for add expense', () => {
    render(<FAB onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(button).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', async () => {
    render(<FAB onClick={mockOnClick} />);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
