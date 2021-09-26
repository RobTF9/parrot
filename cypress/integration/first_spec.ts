describe('Log in and activate parrot', () => {
  it('User can visit login page', () => {
    cy.visit('/');
    cy.get('a').contains('Login').click();
    cy.get('h1').should('contain', 'Login to Parrot');
  });

  // check front end validation errors

  // check server errors

  // let user log in
  it('Should let users enter details', () => {
    cy.get('input[name=email]').type('robert.b.s@live.co.uk');
    cy.get('input[name=password]').type('password{enter}');
    cy.get('button').contains('Bengali').click();
    cy.get('h1').should('contain', 'Hey Rob');
  });

  // check parrot can be selected
});
