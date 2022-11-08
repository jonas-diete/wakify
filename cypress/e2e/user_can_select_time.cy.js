describe('SelectTime', () => {
  it('should get to time selection screen', () => {
    cy.visit('/');
    cy.contains('Time').click();
    cy.get('title').contains('Time');
  })

  it('hour and minute selectors are visible', () => {
    cy.visit('/');
    cy.contains('Time').click();
    cy.get('div').contains('08');
    cy.get('div').contains('00');
  })
})

