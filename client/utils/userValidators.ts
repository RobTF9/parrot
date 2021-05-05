const validEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateSignup = (d: UserSubmission): UserSubmission => {
  let errors = {};

  if (!d.password || d.password.trim() === '') {
    errors = { ...errors, password: 'Cannot be empty' };
  }

  if (!d.username || d.username.trim() === '') {
    errors = { ...errors, username: 'Cannot be empty' };
  }

  if (!d.email || d.email.trim() === '') {
    errors = { ...errors, email: 'Cannot be empty' };
  } else if (!validEmail(d.email)) {
    errors = { ...errors, email: 'Please enter a valid email address' };
  }

  return errors;
};

export const validateSignIn = (d: UserSubmission): UserSubmission => {
  let errors = {};

  if (!d.password || d.password.trim() === '') {
    errors = { ...errors, password: 'Cannot be empty' };
  }

  if (!d.email || d.email.trim() === '') {
    errors = { ...errors, email: 'Cannot be empty' };
  } else if (!validEmail(d.email)) {
    errors = { ...errors, email: 'Please enter a valid email address' };
  }

  return errors;
};

export const validateUpdate = (d: UserSubmission): UserSubmission => {
  let errors = {};

  if (!d.username || d.username.trim() === '') {
    errors = { ...errors, username: 'Cannot be empty' };
  }

  if (!d.email || d.email.trim() === '') {
    errors = { ...errors, email: 'Cannot be empty' };
  } else if (!validEmail(d.email)) {
    errors = { ...errors, email: 'Please enter a valid email address' };
  }

  return errors;
};

export const validateEmail = (email: string): { email?: string } => {
  let errors = {};

  if (!email || email.trim() === '') {
    errors = { ...errors, email: 'Cannot be empty' };
  } else if (!validEmail(email)) {
    errors = { ...errors, email: 'Please enter a valid email address' };
  }

  return errors;
};

export const validatePassword = (password: string): { password?: string } => {
  let errors = {};

  if (!password || password.trim() === '') {
    errors = { ...errors, password: 'Cannot be empty' };
  }

  return errors;
};
