import { cleanup, render, screen } from '@testing-library/react';
import { ExpenseCard } from './ExpenseCard';
import { Expense } from '../types/expense';
import userEvent from '@testing-library/user-event';

jest.mock('lucide-react', () => {
  return {
    Trash2: () => <svg data-testid='trash-icon' />,
    Pencil: () => <svg data-testid='pencil-icon' />,
  };
});

describe('ExpenseCard', () => {
  const mockedExpense: Expense = {
    id: '1',
    description: 'Groceries',
    amount: 150,
    date: '2026-01-22',
    category: 'Food',
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <ExpenseCard
        expense={mockedExpense}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );
  });

  it('should render the expense badge', () => {
    const badge = screen.getByText(mockedExpense.category);

    expect(badge).toBeInTheDocument();
  });

  it('should render the date preview', () => {
    const datePreview = screen.getByText('22 de jan.');

    expect(datePreview).toBeInTheDocument();
  });

  it('should render the description of the expense', () => {
    const description = screen.getByText('Groceries');

    expect(description).toBeInTheDocument();
  });

  it('should render the value of the expense', () => {
    const value = screen.getByText('R$ 150,00');

    expect(value).toBeInTheDocument();
  });

  it('should render the value of the expense', () => {
    const value = screen.getByText('R$ 150,00');

    expect(value).toBeInTheDocument();
  });

  it('should render the edit button', () => {
    const editButton = screen.getByLabelText('Editar');

    expect(editButton).toBeInTheDocument();
  });

  it('should render the pencil icon inside the edit button', () => {
    const pencilIcon = screen.getByTestId('pencil-icon');

    expect(pencilIcon).toBeInTheDocument();
  });

  it('should be able to click the edit button', async () => {
    const editButton = screen.getByLabelText('Editar');

    await userEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockedExpense);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('should render the delete button', () => {
    const deletButton = screen.getByLabelText('Deletar');

    expect(deletButton).toBeInTheDocument();
  });

  it('should render the trash icon inside the delete button', () => {
    const trashIcon = screen.getByTestId('trash-icon');

    expect(trashIcon).toBeInTheDocument();
  });

  it('should be able to click the delete button', async () => {
    const deleteButton = screen.getByLabelText('Deletar');
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockedExpense.id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should not render description when it is empty', () => {
    cleanup();

    const expenseWithoutDescription: Expense = {
      ...mockedExpense,
      description: '',
    };

    render(
      <ExpenseCard
        expense={expenseWithoutDescription}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
  });

  it('should render category badge for unknown category', () => {
    const expenseWithUnknownCategory: Expense = {
      ...mockedExpense,
      category: 'Investimentos',
    };

    render(
      <ExpenseCard
        expense={expenseWithUnknownCategory}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    expect(screen.getByText('Investimentos')).toBeInTheDocument();
  });
});
