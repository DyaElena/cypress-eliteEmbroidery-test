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

  it("verifies that user was logged in", () => {
    cy.contains("T-Shirts & Vests").click();
    cy.get(".product").each((product) => {
      product.click();
      cy.contains("Select a colour").click();
      cy.get(".product-colours").find("ul").find("li").eq(0);
    });
  });
});
