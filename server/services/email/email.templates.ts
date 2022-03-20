export const resetPasswordTemplate = (name: string, link: string): string => `
  <h1>Reset password for Parrot</h1>
  <p>Hi ${name}, You recently requested to reset your password for Parrot</p>
  <a href="${link}">Reset here</a>
`;

export const parrotSharedWithYouTemplate = (
  sender: string,
  name: string,
  link: string
): string => `
  <h1>${sender} shared a parrot with you</h1>
  <p>Hi ${name}, vist Parrot to view the new parrot.</p>
  <a href="${link}">Go to Parrot</a>
`;

export const onBoardingEmail = (name: string, link: string): string => `
  <h1>Welcome to the Parrot Beta!</h1>
  <p>Hi ${name}, thanks for signing up to the beta.</p>
  <p>If you have any questions please send them to <a href="mailto:support@parrot.to">support@parrot.to</a></p>
  <a href="${link}">Go to Parrot</a>
`;
