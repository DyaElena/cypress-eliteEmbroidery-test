describe("Account tests", () => {
  beforeEach("Login", () => {
    cy.session("user-hellothere1599@gmail.com", () => {
      cy.visit("/user-login/");
      cy.get("#input-email").type("hellothere1599@gmail.com");
      cy.get("#input-password").type("KateM123");
      cy.get(".btn-primary").click();
      cy.url().should("contain", "my-account/");
    });

    cy.visit("https://eliteembroidery.co.uk/my-account/");
  });

  it("verify", () => {
    cy.fixture("fixtures.json").then((data) => {
      const username = data.username;

      cy.get("h1").should("contain", `Welcome${username}`);
      cy.log("logged in");
    });
  });
});
