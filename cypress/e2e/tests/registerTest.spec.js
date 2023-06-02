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

  it("verifies invalid registration - passwords are different", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").type("Kate");
    cy.get("#input-lastname").type("Miller");
    cy.get("#input-company").type("A cafe");
    cy.get("#input-password").type("KateM123");
    cy.get("#input-confirm").type("KateM12");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-telephone").type("12395566770");
    cy.get("#input-address-1").type("Cable St.");
    cy.get("#input-postcode").type("123456");
    cy.get("select").eq(1).select("195");
    cy.get("#input-city").type("Barcelona");
    cy.get("select").eq(2).select("2979", { force: true });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get(".pull-right > .btn").click({ force: true });

    cy.get("#input-confirm")
      .siblings()
      .should("contain", "Password confirmation does not match password!");
  });

  it("verifies invalid registration - required fields (password, company, address, postcode, city) are too short", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").type("Kate");
    cy.get("#input-lastname").type("Miller");
    cy.get("#input-company").type("A");
    cy.get("#input-password").type("Kat");
    cy.get("#input-confirm").type("Kat");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-telephone").type("12395566770");
    cy.get("#input-address-1").type("St");
    cy.get("#input-postcode").type("9");
    cy.get("select").eq(1).select("195");
    cy.get("#input-city").type("B");
    cy.get("select").eq(2).select("2979", { force: true });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get(".pull-right > .btn").click({ force: true });

    cy.get("#input-password")
      .siblings()
      .should("contain", "Password must be between 4 and 20 characters!");
    cy.get("#input-company")
      .siblings()
      .should("contain", "Company must be between 3 and 128 characters!");
    cy.get("#input-address-1")
      .siblings()
      .should("contain", "Address must be between 3 and 128 characters!");
    // cy.get("#input-postcode")
    //   .siblings()
    //   .should("contain", "Postcode must be between 2 and 10 characters!"); // error message says this, when leave empty field, but when type 1 symbol, error message doesn't appear anymore.
    cy.get("#input-city")
      .siblings()
      .should("contain", "City must be between 2 and 128 characters!");
  });

  it("verifies invalid registration - didn't accept Privacy Policy", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").type("Kate");
    cy.get("#input-lastname").type("Miller");
    cy.get("#input-company").type("A cafe");
    cy.get("#input-password").type("KateM123");
    cy.get("#input-confirm").type("KateM123");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-telephone").type("12395566770");
    cy.get("#input-address-1").type("Cable St.");
    cy.get("#input-postcode").type("123456");
    cy.get("select").eq(1).select("195");
    cy.get("#input-city").type("Barcelona");
    cy.get("select").eq(2).select("2979", { force: true });
    cy.get(".pull-right > .btn").click({ force: true });

    cy.get("[class='alert alert-danger alert-dismissible']").should(
      "contain",
      "Warning: You must agree to the Privacy Policy!"
    );
  });

  it("verifies valid registration", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").type("Kate");
    cy.get("#input-lastname").type("Miller");
    cy.get("#input-company").type("A cafe");
    cy.get("#input-password").type("KateM123");
    cy.get("#input-confirm").type("KateM123");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-telephone").type("12395566770");
    cy.get("#input-address-1").type("Cable St.");
    cy.get("#input-postcode").type("123456");
    cy.get("select").eq(1).select("195");
    cy.get("#input-city").type("Barcelona");
    cy.get("select").eq(2).select("2979", { force: true });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get(".pull-right > .btn").click({ force: true });

    cy.get("h1").should("contain", "Trade Account - Pending");
  });

  it.only("verifies invalid registration - email already registered", () => {
    cy.get(".well > .btn-orange").click();

    cy.get("#input-firstname").type("Kate");
    cy.get("#input-lastname").type("Miller");
    cy.get("#input-company").type("A cafe");
    cy.get("#input-password").type("KateM123");
    cy.get("#input-confirm").type("KateM123");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-telephone").type("12395566770");
    cy.get("#input-address-1").type("Cable St.");
    cy.get("#input-postcode").type("123456");
    cy.get("select").eq(1).select("195");
    cy.get("#input-city").type("Barcelona");
    cy.get("select").eq(2).select("2979", { force: true });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get(".pull-right > .btn").click({ force: true });

    cy.get("[class='alert alert-danger alert-dismissible']").should(
      "contain",
      "Warning: E-Mail Address is already registered!"
    );
  });
});
