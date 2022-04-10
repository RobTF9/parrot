describe('Reset password', () => {
  const serverId = 'h5wjvmse';
  const serverDomain = 'h5wjvmse.mailosaur.net';
  const supportEmail = `support@${serverDomain}`;

  it('User can visit forgotten password page', () => {
    cy.visit('/');
    cy.get('a').contains('Login').click();
    cy.get('a').contains('Forgotten your password?').click();
    cy.get('h1').should('contain', 'Forgotten password');
  });

  it('User can submit email', () => {
    cy.get('input[name=email]').type('user@email.com');
    cy.get('button').contains('Submit details').click();
    cy.get('p').should('contain', 'Reset link sent');
    cy.mailosaurGetMessage(serverId, {
      sentTo: supportEmail,
    }).then((email) => cy.log(email.subject));
  });
});
