describe('Reset password', () => {
  const serverId = 'h5wjvmse';
  let passwordResetLink;

  it('User can visit forgotten password page', () => {
    cy.visit('/');
    cy.get('a').contains('Login').click();
    cy.get('a').contains('Forgotten your password?').click();
    cy.get('h1').should('contain', 'Forgotten password');
  });

  it('User can submit email', () => {
    cy.get('input[name=email]').type('user@h5wjvmse.mailosaur.net');
    cy.get('button').contains('Submit details').click();
    cy.get('p').should('contain', 'Reset link sent');
  });

  it('User gets a password reset email', () => {
    // @ts-ignore
    cy.mailosaurGetMessage(serverId, {
      sentTo: 'user@h5wjvmse.mailosaur.net',
    }).then((email) => {
      expect(email.subject).to.equal('Reset your password');
      passwordResetLink = email.html.links[0].href;
    });
  });

  it('User can visit reset password page', () => {
    cy.visit(passwordResetLink);
    cy.get('h1').should('contain', 'Reset your password');
  });

  it('User can submit a new password', () => {
    cy.get('input[name=password]').type('password');
    cy.get('button').contains('Reset password').click();
    cy.get('p').should('contain', 'Password reset successfully');
  });
});
