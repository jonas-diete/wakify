it('displays a button', () => {
  cy.visit('localhost:19006');
  cy.contains('Select Time to Get Notifications').should('be.visible');
})