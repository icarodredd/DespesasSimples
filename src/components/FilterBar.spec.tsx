import { render, screen } from '@testing-library/react';
import { FilterBar } from './FilterBar';
import userEvent from '@testing-library/user-event';

describe('FilterBar', () => {
  const mockedOnCategoryChange = jest.fn();
  const categories = ['Category 1', 'Category 2', 'Category 3'];

  it('should render the categories', () => {
    render(
      <FilterBar
        categories={categories}
        onCategoryChange={mockedOnCategoryChange}
        selectedCategory='Todas'
      />,
    );
    const categoryButtons = screen.getAllByText(/Category/);

    expect(categoryButtons.values).toBe(categories.values);
  });

  it('should call onCategoryChange when the user click a category', async () => {
    render(
      <FilterBar
        categories={categories}
        onCategoryChange={mockedOnCategoryChange}
        selectedCategory='Todas'
      />,
    );
    const categoryButton = screen.getByRole('button', { name: 'Category 2' });

    await userEvent.click(categoryButton);

    expect(mockedOnCategoryChange).toHaveBeenCalledWith('Category 2');
    expect(mockedOnCategoryChange).toHaveBeenCalledTimes(1);
  });
});
