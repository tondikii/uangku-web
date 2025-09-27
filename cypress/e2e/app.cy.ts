describe("App Component E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render main heading", () => {
    cy.get("h1").should("contain.text", "Vite + React");
  });

  it("should render Vite and React logos with correct alt text", () => {
    cy.get('img[alt="Vite logo"]').should("be.visible");
    cy.get('img[alt="React logo"]').should("be.visible");
  });

  it("should render external links with correct hrefs", () => {
    cy.get('a[href="https://vite.dev"]').should("exist");
    cy.get('a[href="https://react.dev"]').should("exist");
  });

  it("counter should increment when clicked", () => {
    cy.get("button").contains("count is 0");
    cy.get("button").click().contains("count is 1");
    cy.get("button").click().contains("count is 2");
  });
});
