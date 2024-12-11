describe('Users Table Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the page with table headers and pagination', () => {
    cy.contains('h2', 'Users').should('be.visible');

    const headers = ['Fullname', 'Email Address', 'Address'];
    headers.forEach((header) => {
      cy.contains('th', header).should('be.visible');
    });

    cy.get('.flex.justify-end').should('be.visible');
  });

  it('should display user data in table rows', () => {
    cy.wait(1000);

    cy.get('tbody tr').should('have.length.at.least', 1);

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('td').eq(0).should('not.be.empty');
        cy.get('td').eq(1).should('not.be.empty');
        cy.get('td').eq(2).should('not.be.empty');
      });
  });

  it('should navigate to user posts on row click', () => {
    cy.get('tbody tr').first().click();

    cy.url().should('include', '/user-posts/');
  });
});
