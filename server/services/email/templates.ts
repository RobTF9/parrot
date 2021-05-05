export const resetPassword = (name: string, link: string): string => `
  <h1>Reset password for Parrot</h1>
  <p>Hi ${name}, Here is your password reset link</p>
  ${link}
`;
