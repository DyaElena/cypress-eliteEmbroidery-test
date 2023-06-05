describe("register tests", () => {
  beforeEach(() => {
    cy.visit("https://eliteembroidery.co.uk/");
    cy.contains("Login / Register").click();
  });

  it("verifies valid login", () => {
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();

    cy.url().should("contain", "my-account/");
  });

  it("verifies invalid login - empty email field", () => {
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  });

  it("verifies invalid login - empty password field", () => {
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get(".btn-primary").click();
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  });

  it.only("verifies invalid login - empty email and password fields", () => {
    cy.get(".btn-primary").click();
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  });

  it("verifies invalid login - email is not registered", () => {
    cy.get("#input-email").type("hell1599@gmail.com");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  });

  it("verifies invalid login - email or password is wrong", () => {
    cy.get("#input-email").type("hell1599@gmail.com");
    cy.get("#input-password").type("zzzz1");
    cy.get(".btn-primary").click();
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  });

  it("verifies invalid login - entered email has wrong format", () => {
    cy.get("#input-email").type("hell1599");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  });
});
