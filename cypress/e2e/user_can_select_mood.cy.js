describe("SelectMood", () => {
  it("should get to mood screen", () => {
    cy.visit("/");
    cy.contains("Mood").click();
    cy.get("title").contains("Mood");
  });

  it("should click on Authorize button", () => {
    cy.visit("/");
    cy.contains("Mood").click();
    cy.contains("Authorize Spotify").click();

    // Cypress doesn't allow us to test this pop-up window, so this test cannot be completed.
    
    // cy.window().then((win) => {
    //   cy.stub(win, "open", (url) => {
    //     win.location.href =
    //       "https://apresolve.spotify.com/?type=dealer&type=spclient";
    //   }).as("popup");
    // });
    // cy.contains("Authorize Spotify").click();
    // cy.get("@popup").should("be.called");
    // cy.contains("Password").should("be.visible");
  });
});
