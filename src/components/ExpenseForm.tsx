import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Expense, ExpenseFormData } from '../types/expense';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  onClose: () => void;
  expense?: Expense | null;
}

const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Lazer',
  'Outros',
];

export function ExpenseForm({ onSubmit, onClose, expense }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: 0,
    category: 'Alimentação',
    description: '',
    date: new Date().toISOString().split('T')[0] as string,
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) return;
    onSubmit(formData);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numericValue = parseInt(value || '0') / 100;
    setFormData({ ...formData, amount: numericValue });
  };

  const formatAmountDisplay = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center'>
      <div
        className='bg-background w-full md:max-w-md md:rounded-3xl rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:fade-in duration-200'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h2 className='text-xl font-semibold'>
            {expense ? 'Editar Despesa' : 'Nova Despesa'}
          </h2>
          <button
            onClick={onClose}
            className='p-2 rounded-full hover:bg-muted transition-colors duration-200'
            aria-label='Fechar'
          >
            <X className='w-5 h-5 text-muted-foreground' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Valor */}
          <div>
            <label className='block text-sm text-muted-foreground mb-2'>
              Valor
            </label>
            <input
              type='text'
              data-testid='amount-input'
              inputMode='numeric'
              value={formatAmountDisplay(formData.amount)}
              onChange={handleAmountChange}
              className='w-full text-4xl font-semibold bg-transparent border-none outline-none focus:ring-0 p-0'
              placeholder='R$ 0,00'
              autoFocus
            />
          </div>

          {/* Categoria */}
          <div>
            <label className='block text-sm text-muted-foreground mb-3'>
              Categoria
            </label>
            <div className='grid grid-cols-2 gap-2'>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type='button'
                  onClick={() => setFormData({ ...formData, category })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    formData.category === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className='block text-sm text-muted-foreground mb-2'>
              Descrição (opcional)
            </label>
            <input
              type='text'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full px-4 py-3 bg-muted rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors duration-200'
              placeholder='Ex: Almoço no restaurante'
            />
          </div>

          {/* Data */}
          <div>
            <label className='block text-sm text-muted-foreground mb-2'>
              Data
            </label>
            <input
              type='date'
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className='w-full px-4 py-3 bg-muted rounded-xl border border-transparent focus:border-primary focus:outline-none transition-colors duration-200'
            />
          </div>

          {/* Botões */}
          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-3 px-4 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors duration-200'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={formData.amount <= 0}
              className='flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
            >
              {expense ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
