describe("register tests", () => {
  beforeEach(() => {
    cy.visit("https://eliteembroidery.co.uk/");
    cy.contains("Login / Register").click();
  });

  it("verify login/register button", () => {
    cy.url().should("contain", "/user-login/");
  });

  it('verify "don\'t have account button"', () => {
    cy.get(".well > .btn-orange").click();
    cy.url().should("contain", "/create-account/");
  });

  it("verifies that all required fields are visible on the page", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").should("be.visible");
    cy.get("#input-lastname").should("be.visible");
    cy.get("#input-password").should("be.visible");
    cy.get("#input-confirm").should("be.visible");
    cy.get("#input-email").should("be.visible");
    cy.get("#input-address-1").should("be.visible");
    cy.get("#input-postcode").should("be.visible");
    cy.get("#input-country").should("be.visible");
    cy.get("#input-city").should("be.visible");
    cy.get("#input-zone").should("be.visible");
    cy.get("#input-telephone").should("be.visible");
    cy.get("#input-company").should("be.visible");
  });

  it("verifies invalid registration - all fields are empty", () => {
    cy.get(".well > .btn-orange").click();

    cy.get(".pull-right > .btn").click();

    cy.get('[class= "alert alert-danger alert-dismissible"]').should(
      "be.visible"
    );
    cy.contains("First Name must be between 1 and 32 characters!").should(
      "be.visible"
    );
    cy.contains("Last Name must be between 1 and 32 characters!").should(
      "be.visible"
    );
    cy.contains("Password must be between 4 and 20 characters!").should(
      "be.visible"
    );
    cy.contains("Company must be between 3 and 128 characters!").should(
      "be.visible"
    );
    cy.contains("E-Mail Address does not appear to be valid!").should(
      "be.visible"
    );
    cy.contains("Telephone or Mobile must be provided!").should("be.visible");
    cy.contains("Address must be between 3 and 128 characters!").should(
      "be.visible"
    );
    cy.contains("Postcode must be between 2 and 10 characters!").should(
      "be.visible"
    );
    cy.contains("City must be between 2 and 128 characters!").should(
      "be.visible"
    );
    cy.contains("Please select a region / state!").should("be.visible");
  });

  it.only("verifies invalid registration - passwords are different", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").type("Kate");
    cy.get("#input-lastname").type("Miller");
    cy.get("#input-password").type("KateM123");
    cy.get("#input-confirm").type("KateM12");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-address-1").type("Cable St.");
    cy.get("#input-postcode").type("123456");
    cy.get("#input-country").type("spain({enter}");
    cy.get("#input-city").type("Barcelona");
    cy.get("#input-zone").type("huelva{enter}");
    cy.get('[type="checkbox"]').click();
    cy.get(".pull-right > .btn").click();

    cy.log("registered");
  });
});
