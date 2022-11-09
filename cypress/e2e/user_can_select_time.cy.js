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

  it('user can select time and it displays', () => {
    cy.visit('/');
    cy.get('div').contains('Time').click();
    cy.get('div').contains('08').click();
    cy.get('div').contains('07').click();
    cy.get('div').contains('00').click();
    cy.get('div').contains('05').click();
  })

  it('user can select time and it displays', () => {
    cy.visit('/');
    cy.get('div').contains('Time').click();
    cy.get('div').contains('Your notification time is not chosen yet.');
  })

  it('user can select time and it displays', () => {
    cy.visit('/');
    cy.get('div').contains('Time').click();
    cy.get('div').contains('08').click();
    cy.get('div').contains('07').click();
    cy.get('div').contains('00').click();
    cy.get('div').contains('05').click();
    cy.get('div').contains('Submit').click();
    cy.get('div').contains('Time').click();
    cy.get('div').contains('Your notification time is 7:05');
  })
})

