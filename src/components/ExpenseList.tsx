import { ExpenseCard } from './ExpenseCard';
import { EmptyState } from './EmptyState';
import type { Expense } from '../types/expense';

export interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <EmptyState message='Nenhuma despesa registrada ainda' />;
  }

  return (
    <div className='space-y-3'>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
