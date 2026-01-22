import { Header } from './Header';
import { render, screen } from '@testing-library/react';

jest.mock('./ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

describe('Header', () => {
  const mockedTitle = 'Header Title';
  const mockedAction = <button>Action</button>;

  beforeEach(() => {
    render(<Header title={mockedTitle} action={mockedAction} />);
  });

  it('should render the title of the header', () => {
    const title = screen.getByText(mockedTitle);
    expect(title).toBeInTheDocument();
  });

  it('should render the action element', () => {
    const action = screen.getByText('Action');
    expect(action).toBeInTheDocument();
  });
});
