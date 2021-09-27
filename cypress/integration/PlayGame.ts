describe('Play game', () => {
  beforeEach(() => {
    cy.exec('yarn reset:test && yarn seed:test');
    cy.request('POST', '/auth/signin', {
      email: 'user@email.com',
      password: 'password',
    });
    cy.request('GET', '/api/parrot/6093e4e3103adf787edeb009');
  });

  it('Should let users play a game', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.get('a').contains('Create a game from phrases');
  });
});
