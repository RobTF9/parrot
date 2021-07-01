export const resetPasswordTemplate = (name: string, link: string): string => `
  <h1>Reset password for Parrot</h1>
  <p>Hi ${name}, You recently requested to reset your password for Parrot</p>
  <a href="${link}">Reset here</a>
`;

export const lexiconSharedWithYouTemplate = (
  sender: string,
  name: string,
  link: string
): string => `
  <h1>${sender} shared a lexicon with you</h1>
  <p>Hi ${name}, vist Parrot to view the new lexicon, edit words and sentences, and play games.</p>
  <a href="${link}">Go to Parrot</a>
`;
