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
  LEXICON_EXISTS: errorMessage('You already have a Parrot for this language'),
  ALREADY_SHARED: errorMessage(
    "You've already shared this Parrot with another user"
  ),
  CANT_SHARE_WITH_SELF: errorMessage("You can't share this with yourself"),
  NO_LEXICON_ACTIVE: errorMessage('No parrot active'),
  TAG_INVALID: errorMessage('Invalid tag provided'),
  TAG_EXISTS: errorMessage('Tag already exists'),
  NO_WORDS: errorMessage('Please provide at least one word'),
  INVALID_MODE: errorMessage('Your game mode is invalid'),
  NO_PHRASE_MATCH: errorMessage('No match, try again!'),
  DUPLICATE_PHRASE: errorMessage("You've already added this phrase"),
  DUPLICATE_GENERIC: errorMessage('Already exisits'),
  INTERNAL_SERVER: errorMessage('An unknown error occured, please try again'),
  PHRASE_GOAL_NOT_REACHED: errorMessage(
    'You need to reach your daily phrase goal before playing a game'
  ),
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
  LEXICON_ACTIVATED: succesMessage('Parrot activated'),
  LEXICON_SHARED: succesMessage('Parrot shared succesfully'),
  LEXICON_UNSHARED: succesMessage('Parrot unshared succesfully'),
  LEXICON_CREATED: succesMessage('Parrot created succesfully'),
  PARROT_UPDATED: succesMessage('Parrot updated succesfully'),
  USER_UPDATED: succesMessage('Your details have been updated'),
  USER_DELETED: succesMessage('User deleted successfully'),
  TAG_CREATED: succesMessage('Tag created succesfully'),
  TAG_UPDATED: succesMessage('Tag updated succesfully'),
  TAG_REUSED: succesMessage('Existing tag added to phrase'),
  PHRASE_CREATED: succesMessage('Phrase created succesfully'),
  GAME_CREATED: succesMessage('Game created succesfully'),
  PHRASE_UPDATED: succesMessage('Phrase updated succesfully'),
  GAME_UPDATED: succesMessage('Game finished, well done!'),
  GAME_RELOADED: succesMessage('Game started again'),
  GAME_STARTED: succesMessage('New game started!'),
  GAME_FINISHED: succesMessage('Game finished! Well done'),
  PHRASE_MATCH: succesMessage('Matched, well done!'),
  PHRASE_ALREADY_MATCHED: succesMessage('Already completed!'),
  PARROT_DELETED: succesMessage('Parrot deleted successfully'),
};
