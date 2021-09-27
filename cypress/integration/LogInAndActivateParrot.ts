describe('Login and actiavte parrot', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('User can visit login page', () => {
    cy.visit('/');
    cy.get('a').contains('Login').click();
    cy.get('h1').should('contain', 'Login to Parrot');
  });

  it('Displays front end validation errors', () => {
    cy.get('button').contains('Login').click();
    cy.get('em').should('contain', 'Cannot be empty');
  });

  it('Displays server errors', () => {
    cy.get('input[name=email]').type('wronguser@email.com');
    cy.get('input[name=password]').type('wrongpassword{enter}');
    cy.get('p.mid').should('contain', 'Invalid email and password combination');
  });

  it('User can login', () => {
    cy.get('button > svg').click();
    cy.get('input[name=email]').clear().type('user@email.com');
    cy.get('input[name=password]').clear().type('password{enter}');
    cy.get('h1').should('contain', 'Pick which parrot to teach today');
  });

  it('Can select a parrot and be redirected to the home page', () => {
    cy.get('button').contains('Bengali').click();
    cy.get('h1').should('contain', 'Hey User');
  });
});
