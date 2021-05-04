import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

export default renderWithRouter;
