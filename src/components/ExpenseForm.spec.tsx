import { cleanup, render, screen } from '@testing-library/react';
import { Expense, ExpenseFormData } from '../types/expense';
import userEvent from '@testing-library/user-event';
import { CATEGORIES, ExpenseForm } from './ExpenseForm';

describe('ExpenseForm', () => {
  const mockOnSubmit = jest.fn((data: ExpenseFormData) => {});
  const mockOnClose = jest.fn();
  const mockExpense: Expense = {
    id: '1',
    amount: 150,
    category: 'Alimentação',
    description: 'Doces',
    date: '2024-06-15',
  };

  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <ExpenseForm
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        expense={mockExpense}
      />,
    );
  });

  it('should render the header "Editar Despesa" if have one', () => {
    cleanup();

    render(<ExpenseForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    const header = screen.getByText('Nova Despesa');

    expect(header).toBeInTheDocument();
  });

  it('should render the header "Nova Despesa" if there are no expenses ', () => {
    cleanup();

    render(<ExpenseForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    const header = screen.getByText('Nova Despesa');

    expect(header).toBeInTheDocument();
  });

  it('should render the button to close the form', () => {
    const closeButton = screen.getByLabelText('Fechar');

    expect(closeButton).toBeInTheDocument();
  });

  it('should call onClose if the user click the button to close the form', async () => {
    const closeButton = screen.getByLabelText('Fechar');

    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render the label of "Valor"', () => {
    const label = screen.getByText('Valor');

    expect(label).toBeInTheDocument();
  });

  it('should render the amount input', () => {
    const amountInput = screen.getByPlaceholderText('R$ 0,00');

    expect(amountInput).toBeInTheDocument();
  });

  it('should be able to type in the amount input', async () => {
    const amountInput = screen.getByTestId('amount-input') as HTMLInputElement;

    await user.clear(amountInput);
    await user.type(amountInput, '20000');

    const normalizedValue = amountInput.value.replace(/\u00A0/g, ' ');

    expect(normalizedValue).toBe('R$ 200,00');
  });

  it('should render the label of "Categoria"', () => {
    const label = screen.getByText('Categoria');

    expect(label).toBeInTheDocument();
  });

  it('should render all the category buttons', () => {
    const categoryButtons = screen.getAllByRole('button', {
      name: /Alimentação|Transporte|Moradia|Saúde|Lazer|Educação|Roupas|Contas|Outros/,
    });

    expect(categoryButtons.length).toBe(CATEGORIES.length);
  });

  it('should select a category when clicked', async () => {
    const categoryButton = screen.getByRole('button', { name: /Transporte/i });

    await user.click(categoryButton);

    expect(categoryButton).toHaveClass('bg-primary');
  });

  it('should render the label of "Descrição (opcional)"', () => {
    const label = screen.getByText('Descrição (opcional)');

    expect(label).toBeInTheDocument();
  });

  it('should render the description input', () => {
    const descriptionInput = screen.getByPlaceholderText(
      'Ex: Almoço no restaurante',
    );

    expect(descriptionInput).toBeInTheDocument();
  });

  it('should be able to type in the description input', async () => {
    const descriptionInput = screen.getByTestId(
      'description-input',
    ) as HTMLInputElement;

    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'example of description');

    expect(descriptionInput.value).toBe('example of description');
  });

  it('should render the label of "Data"', () => {
    const label = screen.getByText('Data');

    expect(label).toBeInTheDocument();
  });

  it('should render the date input', () => {
    const label = screen.getByText('Data');
    const dateInput = label.nextSibling as HTMLInputElement;

    expect(dateInput).toBeInTheDocument();
  });

  it('should be able to type in the date input', async () => {
    const label = screen.getByText('Data');
    const dateInput = label.nextSibling as HTMLInputElement;

    await user.clear(dateInput);
    await user.type(dateInput, '2026-06-01');

    expect(dateInput.value).toBe('2026-06-01');
  });

  it('should initialize date input with current date', () => {
    cleanup();
    render(<ExpenseForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);

    const label = screen.getByText('Data');
    const dateInput = label.nextSibling as HTMLInputElement;

    const today = new Date().toISOString().split('T')[0];
    expect(dateInput.value).toBe(today);
  });

  it('should call onSubmit when the form contains the expense total and the other default values', async () => {
    cleanup();

    render(<ExpenseForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByRole('button', { name: 'Adicionar' });
    const amountInput = screen.getByTestId('amount-input') as HTMLInputElement;

    await user.clear(amountInput);
    await user.type(amountInput, '5000');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      amount: 50,
      category: 'Alimentação',
      description: '',
      date: new Date().toISOString().split('T')[0] as string,
    });
  });

  it('should not call onSubmit when the expense total is 0', async () => {
    cleanup();

    render(<ExpenseForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByRole('button', { name: 'Adicionar' });
    const amountInput = screen.getByTestId('amount-input') as HTMLInputElement;

    await user.clear(amountInput);
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should disable the submit button when the expense total is 0', async () => {
    cleanup();

    render(<ExpenseForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByRole('button', { name: 'Adicionar' });

    expect(submitButton).toBeDisabled();
  });
});
