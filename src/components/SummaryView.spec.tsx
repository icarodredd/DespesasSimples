import { render, screen } from '@testing-library/react';
import { SummaryView } from './SummaryView';

jest.mock('./TotalCard', () => ({
  TotalCard: ({ total, period }: { total: number; period: string }) => (
    <div data-testid='total-card'>
      <span>{period}</span>
      <span>{total}</span>
    </div>
  ),
}));

jest.mock('./EmptyState', () => ({
  EmptyState: ({ message }: { message: string }) => (
    <div data-testid='empty-state'>{message}</div>
  ),
}));

describe('SummaryView', () => {
  const mockTotal = 100;
  const mockExpensesByCategory = { Alimentação: 50, Transporte: 50 };

  it('should display empty state when there are no expenses', () => {
    render(<SummaryView total={0} expensesByCategory={{}} expensesCount={0} />);

    const emptyState = screen.getByTestId('empty-state');
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent('Adicione despesas para ver o resumo');
  });

  it('should display the total card with correct props', () => {
    render(
      <SummaryView
        total={mockTotal}
        expensesByCategory={mockExpensesByCategory}
        expensesCount={2}
      />,
    );

    const totalCard = screen.getByTestId('total-card');
    expect(totalCard).toBeInTheDocument();
    expect(totalCard).toHaveTextContent('Total gasto');
    expect(totalCard).toHaveTextContent(mockTotal.toString());
  });

  it('should display the expenses summary by category', () => {
    render(
      <SummaryView
        total={mockTotal}
        expensesByCategory={mockExpensesByCategory}
        expensesCount={2}
      />,
    );

    expect(screen.getByText('Por categoria')).toBeInTheDocument();
    expect(screen.getByText('Alimentação')).toBeInTheDocument();
    expect(screen.getByText('Transporte')).toBeInTheDocument();
  });

  it('should display categories sorted by amount in descending order', () => {
    const categories = { Alimentação: 70, Transporte: 20, Saúde: 10 };
    render(
      <SummaryView
        total={100}
        expensesByCategory={categories}
        expensesCount={3}
      />,
    );

    const categoryElements = screen.getAllByText(
      /Alimentação|Transporte|Saúde/,
    );
    expect(categoryElements[0]).toHaveTextContent('Alimentação');
    expect(categoryElements[1]).toHaveTextContent('Transporte');
    expect(categoryElements[2]).toHaveTextContent('Saúde');
  });

  it('should calculate percentage correctly for each category', () => {
    const categories = { Alimentação: 50, Transporte: 50 };
    render(
      <SummaryView
        total={100}
        expensesByCategory={categories}
        expensesCount={2}
      />,
    );

    const percentages = screen.getAllByText(/50.0%/);
    expect(percentages.length).toBe(2);
  });

  it('should display colored dots for each category', () => {
    render(
      <SummaryView
        total={mockTotal}
        expensesByCategory={mockExpensesByCategory}
        expensesCount={2}
      />,
    );

    const categoryDots = document.querySelectorAll('div[class*="bg-chart"]');
    expect(categoryDots.length).toBeGreaterThan(0);
  });
});
