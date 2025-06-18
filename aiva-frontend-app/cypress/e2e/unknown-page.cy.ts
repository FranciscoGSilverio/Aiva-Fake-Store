describe("Custom 404 Not Found Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("input#username").should("have.value", "Guest1978");
    cy.get("input#password").should("have.value", "guest1978");

    cy.get("button[type='submit']").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should display the 404 page on unknown route and return to home when button is clicked", () => {
    cy.visit("http://localhost:3000/unknown", { failOnStatusCode: false });

    cy.contains("404");
    cy.contains("Oops! A página que você está procurando não existe.");
    cy.contains("Redirecionamento automático em:");
    cy.get("button").contains("De volta para a página inicial").should("exist");

    cy.contains("De volta para a página inicial").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
