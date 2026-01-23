import { Trash2, Pencil } from 'lucide-react';
import type { Expense } from '../types/expense';

export interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(date));
  };

  const categoryColors: Record<string, string> = {
    Alimentação: 'bg-chart-1/10 text-chart-1',
    Transporte: 'bg-chart-2/10 text-chart-2',
    Moradia: 'bg-chart-3/10 text-chart-3',
    Saúde: 'bg-chart-4/10 text-chart-4',
    Lazer: 'bg-chart-5/10 text-chart-5',
    Outros: 'bg-muted text-muted-foreground',
  };

  return (
    <div className='bg-card border border-border rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]'>
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium ${categoryColors[expense.category] || categoryColors['Outros']}`}
            >
              {expense.category}
            </span>
            <span className='text-xs text-muted-foreground'>
              {formatDate(expense.date)}
            </span>
          </div>

          {expense.description && (
            <p className='text-sm text-foreground/80 mb-2 line-clamp-1'>
              {expense.description}
            </p>
          )}

          <p className='text-2xl font-semibold tracking-tight'>
            {formatCurrency(expense.amount)}
          </p>
        </div>

        <div className='flex gap-1 ml-2'>
          <button
            onClick={() => onEdit(expense)}
            className='p-2 rounded-lg hover:bg-muted transition-colors duration-200'
            aria-label='Editar'
          >
            <Pencil className='w-4 h-4 text-muted-foreground' />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className='p-2 rounded-lg hover:bg-destructive/10 transition-colors duration-200'
            aria-label='Deletar'
          >
            <Trash2 className='w-4 h-4 text-destructive' />
          </button>
        </div>
      </div>
    </div>
  );
}
