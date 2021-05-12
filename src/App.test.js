import { render, screen } from '@testing-library/react';
import App from './App';

test('renders preloader', () => {
  render(<App />);
  const preloaderElement = screen.getByText(/Loading.../i);
  expect(preloaderElement).toBeInTheDocument();
});
