import { render, screen } from '@testing-library/react';
import { TotalCard } from './TotalCard';

describe('TotalCard', () => {
  const mockedPeriod = 'Total de contas';
  const mockedTotal = 100;

  it('should display the period', () => {
    render(<TotalCard total={mockedTotal} period={mockedPeriod} />);
    const period = screen.getByText('Total de contas');
    expect(period).toBeInTheDocument();
  });

  it('should display the amount with the correct format', () => {
    render(<TotalCard total={mockedTotal} period={mockedPeriod} />);
    const formattedTotal = screen.getByText('R$ 100,00');
    expect(formattedTotal).toBeInTheDocument();
  });

  it('should display negative values with the correct format', () => {
    render(<TotalCard total={-50} period={mockedPeriod} />);
    const formattedTotal = screen.getByText('-R$ 50,00');
    expect(formattedTotal).toBeInTheDocument();
  });

  it('should use default period when not provided', () => {
    render(<TotalCard total={100} />);
    expect(screen.getByText('Total de despesas')).toBeInTheDocument();
  });
});
