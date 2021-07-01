const errorMessage = (message: string) => ({
  type: 'error',
  message,
  visible: true,
});

export const ERROR_MESSAGE = {
  NEED_EMAIL_AND_PASSWORD: errorMessage('Email and password required'),
  INVALID_EMAIL_AND_PASSWORD: errorMessage(
    'Invalid email and password combination'
  ),
  NEED_EMAIL_PASSWORD_USERNAME: errorMessage(
    'You need to provide an email, password and username'
  ),
  NOT_AUTHORIZED: errorMessage('Not authorised'),
  EMAIL_IN_USE: errorMessage('Email address is already in use'),
  USERNAME_IN_USE: errorMessage('Username is already in use'),
  EMAIL_ADDRESS_DOESNT_EXIST: errorMessage('Email address does not exist'),
  CANNOT_RESET_PASSWORD: errorMessage('Cannot reset password'),
  EMAIL_ADDRESS_REQUIRED: errorMessage('Email address required'),
  RESOURCE_NOT_FOUND: errorMessage('Resource not found'),
  LEXICON_EXISTS: errorMessage('You already have a Lexicon for this language'),
  ALREADY_SHARED: errorMessage(
    "You've already shared this Lexicon with another user"
  ),
  CANT_SHARE_WITH_SELF: errorMessage("You can't share this with yourself"),
  NO_LEXICON_ACTIVE: errorMessage('No lexicon active'),
  TAG_EMPTY: errorMessage('You need to provide text for a tag'),
  NO_WORDS: errorMessage('Please provide at least one word'),
  INVALID_MODE: errorMessage('Your game mode is invalid'),
  NO_ITEM_MATCH: errorMessage('No match, try again!'),
};

const succesMessage = (message: string) => ({
  type: 'success',
  message,
  visible: true,
});

export const SUCCESS_MESSAGE = {
  SIGN_IN_SUCCESSFUL: succesMessage('Signed in successfully'),
  SIGN_UP_SUCCESSFUL: succesMessage('Signed up successful'),
  AUTHORIZED: succesMessage('Authorized'),
  SIGNED_OUT_SUCCESSFULLY: succesMessage('Signed out successfully'),
  PASSWORD_RESET_SUCCESSFULLY: succesMessage('Password reset successfully'),
  RESET_LINK_SENT: succesMessage('Reset link sent'),
  LEXICON_ACTIVATED: succesMessage('Lexicon activated'),
  LEXICON_SHARED: succesMessage('Lexicon shared succesfully'),
  LEXICON_CREATED: succesMessage('Lexicon created succesfully'),
  USER_UPDATED: succesMessage('Your details have been updated'),
  TAG_CREATED: succesMessage('Tag created succesfully'),
  WORD_CREATED: succesMessage('Word created succesfully'),
  GAME_CREATED: succesMessage('Game created succesfully'),
  WORD_UPDATED: succesMessage('Word updated succesfully'),
  GAME_UPDATED: succesMessage('Game updated succesfully'),
  SENTENCE_CREATED: succesMessage('Sentence created succesfully'),
  SENTENCE_UPDATED: succesMessage('Sentence updated succesfully'),
  NOTIFICATIONS_READ: succesMessage('Notifications marked as read'),
  GAME_RELOADED: succesMessage('Game progress restored'),
  GAME_STARTED: succesMessage('New game started!'),
  GAME_FINISHED: succesMessage('Game finished! Well done'),
  ITEM_MATCH: succesMessage('Matched, well done!'),
  ITEM_ALREADY_MATCHED: succesMessage('Already completed!'),
};

export const GAME_TYPE = {
  CONVERSATION: 'CONVERSATION',
  SEQUENCE: 'SEQUENCE',
  GRID: 'GRID',
};

export const GAME_ORDER = {
  RANDOM: 'RANDOM',
  MANUAL: 'MANUAL',
};
