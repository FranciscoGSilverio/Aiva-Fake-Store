describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should render the login form with default values", () => {
    cy.contains("Bem vindo!");
    cy.contains("Coloque suas credenciais para acessar sua conta");

    cy.get("input#username")
      .should("exist")
      .should("have.value", "Guest1978")
      .should("be.disabled");

    cy.get("input#password")
      .should("exist")
      .should("have.value", "guest1978")
      .should("be.disabled");

    cy.contains("Entrar").should("exist");
  });

  it("should show the login warning alert", () => {
    cy.contains(
      "A fucionalidade de login não está implementada nesta versão da API."
    );
  });

  it("should redirect to home page on submit", () => {
    const button = cy.get("button[type='submit']");
    button.should("exist");
    button.click();
    cy.url().should("eq", "http://localhost:3000/");

  });
});
