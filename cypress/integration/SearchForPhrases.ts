describe('User can search for phrases', () => {
  beforeEach(() => {
    cy.request('POST', '/auth/signin', {
      email: 'user@email.com',
      password: 'password',
    }).then(() => cy.request('GET', '/api/parrot/6093e4e3103adf787edeb009'));
  });

  it('User can enter a search term that shows no phrases', () => {
    cy.visit('/phrases');
    cy.get('input[name=search]').type('no');
    cy.get('p.margin-t').should('contain', "You haven't added any phrases yet");
  });

  it('User can enter a search term that shows phrases', () => {
    cy.visit('/phrases');
    cy.get('input[name=search]').clear().type('ka');
    cy.get('p.small').should('contain', 'Kalo / Black');
  });
});
