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
    cy.fixture("fixtures.json").then((data) => {
      const username = data.username;

      cy.get("h1").should("contain", `Welcome${username}`);
      cy.log("logged in");
    });
  });

  it("verifies user Orders - empty spaces", () => {
    cy.contains("Order History").click();
    cy.get("#content p").should(
      "contain",
      "You have not made any previous orders!"
    );
    cy.go("back");

    cy.contains("Quotations").click({ force: true });
    cy.get("#content p").should(
      "contain",
      "You do not have any quotations to view."
    );
    cy.go("back");

    cy.contains("Returns").click({ force: true });
    cy.get("#content p").should(
      "contain",
      "You have not made any previous returns!"
    );
    cy.go("back");

    cy.contains("Contact Us").click({ force: true });
    cy.get("h3").should("contain", "Our Location");

    cy.contains("0191 229 0848").should("be.visible");
    cy.get("address").should("be.visible");
    cy.contains("0191 229 0848").should("be.visible");

    cy.get("#input-name").should("have.attr", "value", "Kate");
    cy.get("#input-email").should(
      "have.attr",
      "value",
      "hellothere1599@gmail.com"
    );
    cy.get("#input-enquiry").should("be.visible");

    cy.get('input[value="Submit"]').should("be.visible");
  });
});
