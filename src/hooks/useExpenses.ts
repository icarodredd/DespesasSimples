import { useState, useEffect } from 'react';
import type { Expense, ExpenseFormData } from '../types/expense';

const STORAGE_KEY = 'despesas-simples-expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Carregar despesas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setExpenses(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      }
    }
  }, []);

  // Salvar despesas no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      ...data,
      id: crypto.randomUUID(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  };

  const updateExpense = (id: string, data: ExpenseFormData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...data } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const getTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    const byCategory: Record<string, number> = {};
    expenses.forEach((expense) => {
      byCategory[expense.category] = (byCategory[expense.category] || 0) + expense.amount;
    });
    return byCategory;
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
    getExpensesByCategory,
  };
}
