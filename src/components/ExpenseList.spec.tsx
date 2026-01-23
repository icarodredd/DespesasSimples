import { render, screen } from '@testing-library/react';
import { ExpenseList } from './ExpenseList';
import type { Expense } from '../types/expense';
import { ExpenseCardProps } from './ExpenseCard';

jest.mock('./EmptyState', () => ({
  EmptyState: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock('./ExpenseCard', () => ({
  ExpenseCard: ({ expense }: ExpenseCardProps) => (
    <div data-testid='expense-card'>{expense.description}</div>
  ),
}));

describe('ExpenseList Component', () => {
  const mockedExpenses: Expense[] = [
    {
      id: '1',
      description: 'Groceries',
      amount: 150,
      date: '2024-06-01',
      category: 'Food',
    },
    {
      id: '2',
      description: 'Utilities',
      amount: 100,
      date: '2024-06-02',
      category: 'House',
    },
  ];
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('should display empty state when there are no expenses', () => {
    render(
      <ExpenseList expenses={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    const emptyStateMessage = screen.getByText(
      'Nenhuma despesa registrada ainda',
    );

    expect(emptyStateMessage).toBeInTheDocument();
  });

  it('should display the expenses correctly', () => {
    render(
      <ExpenseList
        expenses={mockedExpenses}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const expenseCards = screen.getAllByTestId('expense-card');

    expect(expenseCards).toHaveLength(mockedExpenses.length);
  });

  it('should not display empty state when there are expenses', () => {
    render(
      <ExpenseList
        expenses={mockedExpenses}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const emptyStateMessage = screen.queryByText(
      'Nenhuma despesa registrada ainda',
    );

    expect(emptyStateMessage).not.toBeInTheDocument();
  });
});
