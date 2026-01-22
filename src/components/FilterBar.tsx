interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function FilterBar({ selectedCategory, onCategoryChange, categories }: FilterBarProps) {
  return (
    <div className="mb-6 overflow-x-auto -mx-4 px-4">
      <div className="flex gap-2 min-w-min">
        <button
          onClick={() => onCategoryChange('Todas')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedCategory === 'Todas'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
