import { render, screen } from '@testing-library/react';
import { TabBar } from './TabBar';

jest.mock;
describe('TabBar', () => {
  const mockOnTabChange = jest.fn();
  const mockOnActiveTab = 'list';

  it('should render the expenses button with icon', () => {
    render(
      <TabBar activeTab={mockOnActiveTab} onTabChange={mockOnTabChange} />,
    );

    const expensesButton = screen.getByRole('button', { name: /despesas/i });
    const listIcon = expensesButton.querySelector('svg');

    expect(expensesButton).toBeInTheDocument();
    expect(listIcon).toBeInTheDocument();
  });

  it('should render the summary button with icon', () => {
    render(
      <TabBar activeTab={mockOnActiveTab} onTabChange={mockOnTabChange} />,
    );

    const summaryButton = screen.getByRole('button', { name: /resumo/i });
    const pieChartIcon = summaryButton.querySelector('svg');

    expect(summaryButton).toBeInTheDocument();
    expect(pieChartIcon).toBeInTheDocument();
  });

  it('should highlight the active tab', () => {
    render(<TabBar activeTab='summary' onTabChange={mockOnTabChange} />);

    const summaryButton = screen.getByRole('button', { name: /resumo/i });
    expect(summaryButton).toHaveClass('text-primary');

    const expensesButton = screen.getByRole('button', { name: /despesas/i });
    expect(expensesButton).toHaveClass('text-muted-foreground');
  });

  it('should call onTabChange when a tab is clicked', () => {
    render(
      <TabBar activeTab={mockOnActiveTab} onTabChange={mockOnTabChange} />,
    );

    const summaryButton = screen.getByRole('button', { name: /resumo/i });
    summaryButton.click();

    expect(mockOnTabChange).toHaveBeenCalledWith('summary');
    expect(mockOnTabChange).toHaveBeenCalledTimes(1);
  });
});
