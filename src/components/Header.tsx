import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function Header({ title, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {action}
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
