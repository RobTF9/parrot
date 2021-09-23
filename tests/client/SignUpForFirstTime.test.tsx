import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import SpeechRecognition from 'react-speech-recognition';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './_renderWithRouter';
import App from '../../client/App';
import { authServer } from './_servers';
import mockSpeech from './_mockSpeech';
import runTimers from './_runTimers';

describe('During the "Sign up, create parrot, and add first word" user journey I should...', () => {
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

  test('be able to sign up, create a parrot, and add first word', async () => {
    mockSpeech();
    window.HTMLMediaElement.prototype.play = () => null;
    jest.useFakeTimers();
    renderWithRouter(<App />);
    await waitFor(() => screen.getByText('Create a parrot'));

    // User fills in form and submits
    userEvent.click(screen.getByText('Create a parrot'));
    await waitFor(() => screen.getByText('Submit details'));
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.type(screen.getByLabelText('Username'), 'name');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByText('Submit details'));

    // Parrot screen displayed
    await waitFor(() =>
      expect(
        screen.getByText(
          'What language do you want to teach your parrot? (You can create another one later)'
        )
      ).toBeInTheDocument()
    );

    // User picks a parrot
    userEvent.click(screen.getByText('Bengali'));

    // Goal settings screen displayed
    await waitFor(() =>
      expect(
        screen.getByText(
          'How many phrases are you aiming to teach your parrot everyday?'
        )
      ).toBeInTheDocument()
    );

    // User submits goals
    userEvent.click(screen.getByText('Submit daily goals'));

    // User presented with page to say first word
    await waitFor(() =>
      expect(
        screen.getByText('Say a phrase to teach it to you parrot')
      ).toBeInTheDocument()
    );

    // User says the word fish
    act(() => {
      // @ts-expect-error: Ignore polyfill
      SpeechRecognition.getRecognition().say('মাছ');
    });

    // Translation service responds
    await waitFor(() =>
      expect(screen.getByText('Fish - মাছ')).toBeInTheDocument()
    );

    // User picks correct word from translation service
    userEvent.click(screen.getByText('Fish - মাছ'));

    // Wait for phrase form to be in dom
    await waitFor(() =>
      expect(screen.getByLabelText('Bengali')).toBeInTheDocument()
    );

    // User clicks save phrase
    userEvent.click(screen.getByText('Save phrase'));

    // Shown error message because no pron added
    await waitFor(() =>
      expect(screen.getByText('Cannot be empty')).toBeInTheDocument()
    );

    // User adds pronounciation
    userEvent.type(
      screen.getByRole('textbox', { name: 'Pronounciation Cannot be empty' }),
      'Maach'
    );

    // User clicks save phrase
    userEvent.click(screen.getByText('Save phrase'));

    runTimers(4);

    screen.debug();
  });
});
