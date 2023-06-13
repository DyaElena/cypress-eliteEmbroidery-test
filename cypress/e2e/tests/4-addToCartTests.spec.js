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

  it.only("deletes items from the cart", () => {
    cy.get("#site-header-cart").click();
    cy.get(".header-dropdown-wrapper")
      .eq(1)
      .then((container) => {
        const containerText = container.text();
        if (!containerText.includes("View Products")) {
          cy.contains("View Cart").click();
          cy.get(".cart-item-remove").find("button").click();
        } else {
          cy.log("Cart is empty");
        }
      });
  });

  it("verifies that item can be added to the cart", () => {
    cy.contains("T-Shirts & Vests").click();
    cy.get(".product").eq(0).click();
    cy.get(".product-colours-control").click();
    cy.contains("Dark Orange").click();
    cy.get("#option-8334450-32485252").clear().type(3);
    cy.contains("S").click(); // click outside input box
    cy.get("#tm_add_to_cart").click();
    cy.get(".swal2-actions").should("be.visible");
  });

  it("verifies that item with several sizes can be added to the cart", () => {
    cy.contains("T-Shirts & Vests").click();
    cy.get(".product").eq(0).click();
    cy.get(".product-colours-control").click();
    cy.contains("Melange Grey").click();
    cy.get("#option-8334450-32485252").clear().type(3);
    cy.get("#option-8334450-32485254").clear().type(2);
    cy.contains("S").click(); // click outside input box
    cy.get("#tm_add_to_cart").click();
    cy.get(".swal2-actions").should("be.visible");
  });

  it("increases and decreases amount in the cart, deletes item from the cart", () => {
    cy.get("#site-header-cart").click();
    cy.contains("View Cart").click();
    cy.get(".cart-item-remove").each("delete");
  });
});
