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
    cy.get('input[name=email]').type('user@email.com');
    cy.get('input[name=password]').type('password{enter}');
    cy.get('button > p').contains('Bengali').click();
  });

  // check parrot can be selected
});
