import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './_renderWithRouter';
import App from '../../client/App';
import { authServer } from './_servers';

describe('During the "Sign up and create parrot" user journey I should...', () => {
  beforeAll(() => authServer.listen());
  afterEach(() => authServer.resetHandlers());
  afterAll(() => authServer.close());

  test('see error messages if trying to sign up without an email, username and password', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create a parrot'));

    // Act
    userEvent.click(screen.getByText('Create a parrot'));
    await waitFor(() => screen.getByText('Submit details'));
    userEvent.click(screen.getByText('Submit details'));

    // Assert
    await waitFor(() =>
      expect(screen.getAllByText('Cannot be empty')).toHaveLength(3)
    );
  });
});
