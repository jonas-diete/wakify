it('works', () => {
  cy.visit('localhost:19006')
  cy.contains('Wakify')
    .should('be.visible')
})