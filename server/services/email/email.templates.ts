export const resetPasswordTemplate = (name: string, link: string): string => `
  <h1>Reset password for Parrot</h1>
  <p>Hi ${name}, You recently requested to reset your password for Parrot</p>
  <a href="${link}">Reset here</a>
  <p>If this wasn't you, feel free to ignore this message</p>
`;
