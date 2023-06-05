describe("register tests", () => {
  beforeEach(() => {
    cy.visit("https://eliteembroidery.co.uk/");
    cy.contains("Login / Register").click();
  });

  const assertInvalidLogin = () => {
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: No match for E-Mail Address and/or Password."
    );
  };

  it("verifies valid login", () => {
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    cy.url().should("contain", "my-account/");
  });

  it("verifies invalid login - empty email field", () => {
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    assertInvalidLogin();
  });

  it("verifies invalid login - empty password field", () => {
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get(".btn-primary").click();
    assertInvalidLogin();
  });

  it("verifies invalid login - empty email and password fields", () => {
    cy.get(".btn-primary").click();
    assertInvalidLogin();
  });

  it("verifies invalid login - email is not registered", () => {
    cy.get("#input-email").type("hello@gmail.com");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    assertInvalidLogin();
  });

  it("verifies invalid login - email or password is wrong", () => {
    cy.get("#input-email").type("hellthere1599o@gmail.com");
    cy.get("#input-password").type("zzzz1");
    cy.get(".btn-primary").click();
    assertInvalidLogin();
  });

  it("verifies invalid login - entered email has wrong format", () => {
    cy.get("#input-email").type("hell1599");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    assertInvalidLogin();
  });

  it.only("verifies Forgot password functionality - with registered email", () => {
    cy.get(".btn-default").click();
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get(".btn-primary").click({ force: true });
    cy.get(".alert")
      .should("be.visible")
      .and(
        "contain",
        "An email with a confirmation link has been sent to your email address."
      );
  });

  it("verifies Forgot password functionality - not registered email", () => {
    cy.get(".btn-default").click();
    cy.get("#input-email").type("test@test.com");
    cy.get(".btn-primary").click({ force: true });
    cy.get(".alert-dismissible").should(
      "contain",
      "Warning: The E-Mail Address was not found in our records, please try again!"
    );
  });

  it("verifies correct link - return back from Forgot password page to Login page", () => {
    cy.get(".btn-default").click(); // Forgotten password button
    cy.get(".btn-default").click(); // back button
    cy.url().should("contain", "user-login/");
  });
});
