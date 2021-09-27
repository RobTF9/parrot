describe('Log in and activate parrot', () => {
  it('User can visit login page', () => {
    cy.visit('/');
    cy.get('a').contains('Login').click();
    cy.get('h1').should('contain', 'Login to Parrot');
  });

  // check front end validation errors
  it('Displays front end validation errors', () => {
    cy.get('button').contains('Login').click();
    cy.get('em').should('contain', 'Cannot be empty');
  });

  // check server errors
  it('Displays server errors', () => {
    cy.get('input[name=email]').type('wronguser@email.com');
    cy.get('input[name=password]').type('wrongpassword{enter}');
    cy.get('p.mid').should('contain', 'Invalid email and password combination');
  });

  // let user log in
  it('User can login and be asked to pick a parrot', () => {
    cy.get('button > svg').click();
    cy.get('input[name=email]').clear().type('user@email.com');
    cy.get('input[name=password]').clear().type('password{enter}');
    cy.get('h1').should('contain', 'Pick which parrot to teach today');
  });

  // check parrot can be selected
  it('Can select a parrot and be redirected to the home page', () => {
    cy.get('button').contains('Bengali').click();
    cy.get('h1').should('contain', 'Hey User');
  });
});
