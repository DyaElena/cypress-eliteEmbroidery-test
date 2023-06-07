// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add(
  "registerUser",
  ({
    firstName,
    lastName,
    company,
    password,
    confirmPassword,
    email,
    telephone,
    address,
    postcode,
    city,
    countryIndex,
    zoneIndex,
    acceptPrivacyPolicy,
  }) => {
    cy.get("#input-firstname").type(firstName);
    cy.get("#input-lastname").type(lastName);
    cy.get("#input-company").type(company);
    cy.get("#input-password").type(password);
    cy.get("#input-confirm").type(confirmPassword);
    cy.get("#input-email").type(email);
    cy.get("#input-telephone").type(telephone);
    cy.get("#input-address-1").type(address);
    cy.get("#input-postcode").type(postcode);
    cy.get("select").eq(1).select(countryIndex.toString());
    cy.get("#input-city").type(city);
    cy.get("select").eq(2).select(zoneIndex.toString(), { force: true });

    if (acceptPrivacyPolicy) {
      cy.get('[type="checkbox"]').check({ force: true });
    }

    cy.get(".pull-right > .btn").click({ force: true });
  }
);

Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("/user-login/");
    cy.get("#input-email").type("hellothere1599@gmail.com");
    cy.get("#input-password").type("KateM123");
    cy.get(".btn-primary").click();
    cy.url().should("contain", "my-account/");

    cy.visit("https://eliteembroidery.co.uk/my-account/");
  });
});
