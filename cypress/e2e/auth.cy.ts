/* eslint-disable @typescript-eslint/no-unused-expressions */
describe("Sign In Flow", () => {
  beforeEach(() => {
    // reset local storage / cookies biar bersih
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/sign-in");
  });

  it("renders all components should exist on sign in page", () => {
    // check illustration exist
    cy.get("img[alt='Manage Money Illustration']")
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "manage_money.svg");

    // check all form elements exist
    cy.contains("Sign In to Uangku").should("be.visible");
    cy.get("input[type='email']")
      .should("be.visible")
      .should("have.attr", "placeholder", "Email")
      .should("have.attr", "required", "required");
    cy.get("input[type='password']")
      .should("be.visible")
      .should("have.attr", "placeholder", "Password")
      .should("have.attr", "required", "required");
    cy.get("button[type='submit']")
      .should("be.visible")
      .should("have.text", "Sign In");
    cy.contains("Don’t have an account? Sign Up").should("be.visible");
    cy.contains("Sign Up").should("have.attr", "href", "/sign-up");
  });

  it("shows input validation errors on empty submission", () => {
    cy.get("button[type='submit']").click();
    cy.get("input").then(($el) => {
      // $el[0] is the raw DOM element
      // This checks if the specific validation error "valueMissing" is true.
      expect($el[0].validity.valueMissing).to.be.true;
      // This checks if the element is invalid overall.
      expect($el[0].checkValidity()).to.be.false;
    });
  });

  it("shows invalid email format error", () => {
    const emailInputSelector = "input[type='email']";

    cy.get(emailInputSelector).type("invalid-email");
    cy.get("input[type='password']").type("somepassword");
    cy.get("button[type='submit']").click();

    cy.get(emailInputSelector).then(($el) => {
      // Correct Fix: Use a TypeScript type assertion 'as HTMLInputElement'
      // to tell TypeScript the element is an input and has these properties.
      const inputElement = $el[0] as HTMLInputElement;

      // Assertion 1: Check if the specific validation error for type (email) is true
      expect(inputElement.validity.typeMismatch).to.be.true;

      // Assertion 2: Check if the element is considered invalid overall
      expect(inputElement.checkValidity()).to.be.false;

      // Optional: Check if the browser focused on the invalid element
      cy.wrap(inputElement).should("have.focus");
    });
  });

  it("shows invalid credentials error from server", () => {
    cy.get("input[type='email']").type("wronguser@example.com");
    cy.get("input[type='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();

    // spinner muncul
    cy.get("button[type='submit'] .loading").should("be.visible");

    // setelah dummy service delay (1s), spinner hilang
    cy.get("button[type='submit'] .loading", {timeout: 2000}).should(
      "not.exist"
    );

    // error message muncul
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("logs in successfully with correct credentials", () => {
    cy.get("input[type='email']").type("admin@example.com");
    cy.get("input[type='password']").type("password");
    cy.get("button[type='submit']").click();

    // spinner muncul
    cy.get("button[type='submit'] .loading").should("be.visible");

    // setelah dummy service selesai, spinner hilang
    cy.get("button[type='submit'] .loading", {timeout: 2000}).should(
      "not.exist"
    );

    // redirect ke home (karena navigate("/") di useEffect)
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Home Page").should("exist");
  });
});

describe("Sign Up Flow", () => {
  beforeEach(() => {
    // reset local storage / cookies biar bersih
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/sign-up");
  });

  it("renders all components should exist on sign up page", () => {
    // check illustration exist
    cy.get("img[alt='Manage Money Illustration']")
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "manage_money.svg");

    // check all form elements exist
    cy.contains("Sign Up to Uangku").should("be.visible");
    cy.get("input[type='text']")
      .should("be.visible")
      .should("have.attr", "placeholder", "Name")
      .should("have.attr", "required", "required");
    cy.get("input[type='email']")
      .should("be.visible")
      .should("have.attr", "placeholder", "Email")
      .should("have.attr", "required", "required");
    cy.get("input[type='password']")
      .should("be.visible")
      .should("have.attr", "placeholder", "Password")
      .should("have.attr", "required", "required");
  });

  it("shows input validation errors on empty submission", () => {
    cy.get("button[type='submit']").click();
    cy.get("input").then(($el) => {
      // $el[0] is the raw DOM element
      // This checks if the specific validation error "valueMissing" is true.
      expect($el[0].validity.valueMissing).to.be.true;
      // This checks if the element is invalid overall.
      expect($el[0].checkValidity()).to.be.false;
    });
  });

  it("shows invalid email format error", () => {
    const emailInputSelector = "input[type='email']";

    cy.get("input[type='text']").type("Some Name");
    cy.get(emailInputSelector).type("invalid-email");
    cy.get("input[type='password']").type("somepassword");
    cy.get("button[type='submit']").click();

    cy.get(emailInputSelector).then(($el) => {
      const inputElement = $el[0] as HTMLInputElement;

      expect(inputElement.validity.typeMismatch).to.be.true;

      expect(inputElement.checkValidity()).to.be.false;

      cy.wrap(inputElement).should("have.focus");
    });
  });

  it("sign up new user with correct data", () => {
    cy.get("input[type='text']").type("Some Name");
    cy.get("input[type='email']").type("some@example.com");
    cy.get("input[type='password']").type("password");
    cy.get("button[type='submit']").click();

    cy.get("button[type='submit'] .loading").should("be.visible");

    cy.get("button[type='submit'] .loading", {timeout: 2000}).should(
      "not.exist"
    );

    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Home Page").should("exist");
  });
});
