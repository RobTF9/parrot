describe('Sign up and create parrot', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('User can visit sign up page', () => {
    cy.visit('/');
    cy.get('a').contains('Create a parrot').click();
    cy.get('h1').should('contain', 'Create a Parrot');
  });

  it('Displays front end validation errors', () => {
    cy.get('button').contains('Submit details').click();
    cy.get('em').should('contain', 'Cannot be empty');
  });

  it('Displays existing email error', () => {
    cy.get('input[name=email]').type('user@email.com');
    cy.get('input[name=username]').type('user');
    cy.get('input[name=password]').type('password{enter}');
    cy.get('p.mid').should('contain', 'Email address is already in use');
  });

  it('Displays existing username error', () => {
    cy.get('input[name=email]').clear().type('user2@email.com');
    cy.get('input[name=username]').clear().type('User');
    cy.get('input[name=password]').type('password{enter}');
    cy.get('p.mid').should('contain', 'Username is already in use');
  });

  it('User can sign up a be redirected to create parrot page', () => {
    cy.get('input[name=email]').clear().type('user2@email.com');
    cy.get('input[name=username]').clear().type('User2');
    cy.get('input[name=password]').clear().type('password{enter}');
    cy.get('p').should(
      'contain',
      'What language do you want to teach your parrot? (You can create another one later)'
    );
  });

  it('User can pick which parrot to create', () => {
    cy.get('button').contains('Hindi').click();
    cy.get('p').should(
      'contain',
      'How many phrases are you aiming to teach your parrot everyday?'
    );
  });

  it('User can set goals based on default', () => {
    cy.get('button').contains('Submit daily goals').click();
    cy.get('h1').should('contain', 'Say a phrase to teach it to you parrot');
  });
});
