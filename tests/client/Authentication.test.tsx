import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './_renderWithRouter';
import App from '../../client/App';
import { authServer } from './_servers';

beforeAll(() => authServer.listen());
afterEach(() => authServer.resetHandlers());
afterAll(() => authServer.close());

describe('As an unauthenticated user I should...', () => {
  test('be able to sign up', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.type(screen.getByLabelText('Username'), 'name');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Create account'));

    // Assert
    await waitFor(() => expect(screen.getByText('Logout')).toBeInTheDocument());
  });

  test('be able to sign in', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.click(screen.getByText('Sign in'));
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Sign in'));

    // Assert
    await waitFor(() => expect(screen.getByText('Logout')).toBeInTheDocument());
  });
});
