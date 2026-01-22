import { List, PieChart } from 'lucide-react';

interface TabBarProps {
  activeTab: 'list' | 'summary';
  onTabChange: (tab: 'list' | 'summary') => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-40">
      <div className="max-w-2xl mx-auto px-4 flex">
        <button
          onClick={() => onTabChange('list')}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors duration-200 ${
            activeTab === 'list'
              ? 'text-primary'
              : 'text-muted-foreground'
          }`}
        >
          <List className="w-6 h-6" strokeWidth={activeTab === 'list' ? 2.5 : 2} />
          <span className="text-xs font-medium">Despesas</span>
        </button>
        <button
          onClick={() => onTabChange('summary')}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors duration-200 ${
            activeTab === 'summary'
              ? 'text-primary'
              : 'text-muted-foreground'
          }`}
        >
          <PieChart className="w-6 h-6" strokeWidth={activeTab === 'summary' ? 2.5 : 2} />
          <span className="text-xs font-medium">Resumo</span>
        </button>
      </div>
    </div>
  );
}
