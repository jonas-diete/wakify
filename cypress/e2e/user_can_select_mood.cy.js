describe('SelectMood', () => {
  it('should get to mood screen', () => {
    cy.visit('/');
    cy.contains('Mood').click();
    cy.get('title').contains('Mood');
  })
})