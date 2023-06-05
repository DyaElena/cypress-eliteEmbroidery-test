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

    const fieldIds = [
      "#input-firstname",
      "#input-lastname",
      "#input-password",
      "#input-confirm",
      "#input-email",
      "#input-address-1",
      "#input-postcode",
      "#input-country",
      "#input-city",
      "#input-zone",
      "#input-telephone",
      "#input-company",
    ];

    fieldIds.forEach((fieldId) => {
      cy.get(fieldId).should("be.visible");
    });
  });

  it("verifies invalid registration - all fields are empty", () => {
    cy.get(".well > .btn-orange").click();
    cy.get(".pull-right > .btn").click({ force: true });

    cy.get(".alert.alert-danger.alert-dismissible").should("be.visible");

    const errorMessages = [
      "First Name must be between 1 and 32 characters!",
      "Last Name must be between 1 and 32 characters!",
      "Password must be between 4 and 20 characters!",
      "Company must be between 3 and 128 characters!",
      "E-Mail Address does not appear to be valid!",
      "Telephone or Mobile must be provided!",
      "Address must be between 3 and 128 characters!",
      "City must be between 2 and 128 characters!",
      "Please select a region / state!",
    ];

    errorMessages.forEach((errorMessage) => {
      cy.contains(errorMessage).should("be.visible");
    });
  });

  it("verifies invalid registration - passwords are different", () => {
    cy.get(".well > .btn-orange").click();

    cy.registerUser({
      firstName: "Kate",
      lastName: "Miller",
      company: "A cafe",
      password: "KateM123",
      confirmPassword: "KateM12",
      email: "hellothere1599@gmail.com",
      telephone: "12395566770",
      address: "Cable St.",
      postcode: "123456",
      city: "Barcelona",
      countryIndex: 1,
      zoneIndex: 2,
      acceptPrivacyPolicy: true,
    });

    cy.get("#input-confirm")
      .siblings()
      .should("contain", "Password confirmation does not match password!");
  });

  it("verifies invalid registration - required fields are too short", () => {
    cy.get(".well > .btn-orange").click();

    cy.registerUser({
      firstName: "Kate",
      lastName: "Miller",
      company: "A",
      password: "Kat",
      confirmPassword: "Kat",
      email: "hellothere1599@gmail.com",
      telephone: "12395566770",
      address: "St",
      postcode: "9",
      city: "B",
      countryIndex: 1,
      zoneIndex: 2,
      acceptPrivacyPolicy: true,
    });

    cy.get("#input-password")
      .siblings()
      .should("contain", "Password must be between 4 and 20 characters!");
    cy.get("#input-company")
      .siblings()
      .should("contain", "Company must be between 3 and 128 characters!");
    cy.get("#input-address-1")
      .siblings()
      .should("contain", "Address must be between 3 and 128 characters!");
    cy.get("#input-city")
      .siblings()
      .should("contain", "City must be between 2 and 128 characters!");
  });

  it("verifies invalid registration - didn't accept Privacy Policy", () => {
    cy.get(".well > .btn-orange").click();

    cy.registerUser({
      firstName: "Kate",
      lastName: "Miller",
      company: "A cafe",
      password: "KateM123",
      confirmPassword: "KateM123",
      email: "hellothere1599@gmail.com",
      telephone: "12395566770",
      address: "Cable St.",
      postcode: "123456",
      city: "Barcelona",
      countryIndex: 1,
      zoneIndex: 2,
      acceptPrivacyPolicy: false,
    });

    cy.get("[class='alert alert-danger alert-dismissible']").should(
      "contain",
      "Warning: You must agree to the Privacy Policy!"
    );
  });

  it("verifies valid registration", () => {
    cy.get(".well > .btn-orange").click();

    cy.registerUser({
      firstName: "Kate",
      lastName: "Miller",
      company: "A cafe",
      password: "KateM123",
      confirmPassword: "KateM123",
      email: "hellothere1599@gmail.com",
      telephone: "12395566770",
      address: "Cable St.",
      postcode: "123456",
      city: "Barcelona",
      countryIndex: 195,
      zoneIndex: 2979,
      acceptPrivacyPolicy: true,
    });

    cy.get("h1").should("contain", "Trade Account - Pending");
  });

  it.only("verifies invalid registration - email already registered", () => {
    cy.get(".well > .btn-orange").click();

    cy.registerUser({
      firstName: "Kate",
      lastName: "Miller",
      company: "A cafe",
      password: "KateM123",
      confirmPassword: "KateM123",
      email: "hellothere1599@gmail.com",
      telephone: "12395566770",
      address: "Cable St.",
      postcode: "123456",
      city: "Barcelona",
      countryIndex: 195,
      zoneIndex: 2979,
      acceptPrivacyPolicy: true,
    });

    cy.get("[class='alert alert-danger alert-dismissible']").should(
      "contain",
      "Warning: E-Mail Address is already registered!"
    );
  });
});
