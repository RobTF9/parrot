import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../_renderWithRouter';
import App from '../../../client/App';
import { authServer } from '../_servers';

describe('As an unauthenticated user I should...', () => {
  beforeAll(() => authServer.listen());
  afterEach(() => authServer.resetHandlers());
  afterAll(() => authServer.close());

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
    await waitFor(() =>
      expect(
        screen.getByText('Create a lexicon to get started')
      ).toBeInTheDocument()
    );
  });

  test('see an error if signing up without an email', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.type(screen.getByLabelText('Username'), 'name');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Create account'));

    // Assert
    await waitFor(() =>
      expect(screen.getByText('Cannot be empty')).toBeInTheDocument()
    );
  });

  test('see an error if signing up with an invalid email', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.type(screen.getByLabelText('Email'), 'email.com');
    userEvent.type(screen.getByLabelText('Username'), 'name');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Create account'));

    // Assert
    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument()
    );
  });

  test('see an error if signing up without a password', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.type(screen.getByLabelText('Username'), 'name');
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.click(screen.getByText('Create account'));

    // Assert
    await waitFor(() =>
      expect(screen.getByText('Cannot be empty')).toBeInTheDocument()
    );
  });

  test('see an error if signing up without a username', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.click(screen.getByText('Create account'));

    // Assert
    await waitFor(() =>
      expect(screen.getByText('Cannot be empty')).toBeInTheDocument()
    );
  });

  test('be able to sign in', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.click(screen.getByRole('link', { name: 'Sign in' }));
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    // Assert
    await waitFor(() =>
      expect(
        screen.getByText('Create a lexicon to get started')
      ).toBeInTheDocument()
    );
  });

  test('see an error if trying to sign in without an email', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.click(screen.getByRole('link', { name: 'Sign in' }));
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    // Assert
    await waitFor(() =>
      expect(screen.getByText('Cannot be empty')).toBeInTheDocument()
    );
  });

  test('see an error if trying to sign in with an invalid email', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.click(screen.getByRole('link', { name: 'Sign in' }));
    userEvent.type(screen.getByLabelText('Email'), 'email@');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    // Assert
    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument()
    );
  });

  test('see an error if trying to sign in without a password', async () => {
    // Arrange
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create account'));

    // Act
    userEvent.click(screen.getByRole('link', { name: 'Sign in' }));
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    // Assert
    await waitFor(() =>
      expect(screen.getByText('Cannot be empty')).toBeInTheDocument()
    );
  });
});
