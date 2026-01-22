import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { FAB } from './components/FAB';
import { TotalCard } from './components/TotalCard';
import { FilterBar } from './components/FilterBar';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { SummaryView } from './components/SummaryView';
import { useExpenses } from './hooks/useExpenses';
import type { Expense, ExpenseFormData } from './types/expense';

const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Lazer',
  'Outros',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'summary'>('list');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    getExpensesByCategory,
  } = useExpenses();

  // Filtrar despesas por categoria
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'Todas') {
      return expenses;
    }
    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleSubmitExpense = (data: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
    } else {
      addExpense(data);
    }
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta despesa?')) {
      deleteExpense(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const total = getTotal();
  const expensesByCategory = getExpensesByCategory();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Despesas Simples" />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'list' ? (
          <>
            <TotalCard total={total} />
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={CATEGORIES}
            />
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </>
        ) : (
          <SummaryView
            total={total}
            expensesByCategory={expensesByCategory}
            expensesCount={expenses.length}
          />
        )}
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'list' && <FAB onClick={handleAddExpense} />}

      {isFormOpen && (
        <ExpenseForm
          onSubmit={handleSubmitExpense}
          onClose={handleCloseForm}
          expense={editingExpense}
        />
      )}
    </div>
  );
}
