interface TotalCardProps {
  total: number;
  period?: string;
}

export function TotalCard({ total, period = 'Total de despesas' }: TotalCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6">
      <p className="text-sm text-muted-foreground mb-2">{period}</p>
      <p className="text-4xl font-semibold tracking-tight">
        {formatCurrency(total)}
      </p>
    </div>
  );
}
