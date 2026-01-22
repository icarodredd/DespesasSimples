import { TotalCard } from './TotalCard';
import { EmptyState } from './EmptyState';

interface SummaryViewProps {
  total: number;
  expensesByCategory: Record<string, number>;
  expensesCount: number;
}

export function SummaryView({ total, expensesByCategory, expensesCount }: SummaryViewProps) {
  const categoryColors: Record<string, string> = {
    'Alimentação': 'bg-chart-1',
    'Transporte': 'bg-chart-2',
    'Moradia': 'bg-chart-3',
    'Saúde': 'bg-chart-4',
    'Lazer': 'bg-chart-5',
    'Outros': 'bg-muted-foreground',
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a);

  if (expensesCount === 0) {
    return <EmptyState message="Adicione despesas para ver o resumo" />;
  }

  return (
    <div className="space-y-6">
      <TotalCard total={total} period="Total gasto" />

      {/* Resumo por categoria */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Por categoria</h3>
        <div className="space-y-4">
          {sortedCategories.map(([category, amount]) => {
            const percentage = (amount / total) * 100;
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${categoryColors[category] || categoryColors['Outros']}`} />
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(amount)}</p>
                    <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${categoryColors[category] || categoryColors['Outros']} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total de despesas</p>
          <p className="text-2xl font-semibold">{expensesCount}</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Média por despesa</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(total / expensesCount)}
          </p>
        </div>
      </div>
    </div>
  );
}
