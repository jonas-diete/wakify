describe('Homepage', () => {
  it('should have Home title', () => {
    cy.visit('/');
    cy.get('title').contains('Home');
  })

  it('contains the buttons', () => {
    cy.visit('/');
    cy.contains('Time').should('be.visible');
    cy.contains('Mood').should('be.visible');
    cy.contains('Genre').should('be.visible');
  })
})
