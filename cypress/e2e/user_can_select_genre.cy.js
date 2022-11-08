describe('SelectGenre', () => {
  it('should get to genre screen', () => {
    cy.visit('/');
    cy.contains('Genre').click();
    cy.get('title').contains('Genre');
  })

  it('should get all the genre buttons', () => {
    cy.visit('/');
    cy.contains('Genre').click();

    // all the genres
    cy.contains('Choose your favourite genre').should('be.visible');
    cy.contains('Rock').should('be.visible');
    cy.contains('Electronic').should('be.visible');
    cy.contains('Hip-Hop').should('be.visible');
    cy.contains('Classical').should('be.visible');
    cy.contains('Dubstep').should('be.visible');
    cy.contains('Folk').should('be.visible');
    cy.contains('R&B').should('be.visible');
    cy.contains('Pop').should('be.visible');
    cy.contains('Jazz').should('be.visible');

    // favourite genre not chosen yet
    cy.contains('Not chosen').should('be.visible');

    // back button
    cy.contains('Back').should('be.visible');
  })

  it("should select favourite genre 'R&B'", () => {
    cy.visit('/');
    cy.contains('Genre').click();

    //
    cy.contains('R&B').click();

    //
    cy.contains('Your favourite Genre is: R&B').should('be.visible');
  })
})