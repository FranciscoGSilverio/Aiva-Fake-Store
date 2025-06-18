describe.skip("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://aiva-fake-store.vercel.app/");
  });

  it("should render the navigation bar and product grid", () => {
    cy.get("section")
      .should("exist");

    // Select input should exist
    cy.get("button").contains("Selecione uma categoria").should("exist");

    // Product grid should render at least one product card
    cy.get("[data-testid=product-card]").should("have.length.greaterThan", 0);

    // Action buttons should be visible
    cy.get("button").contains("Adicionar um produto").should("exist");
    cy.get("button").contains("Logout").should("exist");
  });

  it("should filter products by category and reset the filter", () => {
    cy.get("[role=combobox]").click();
    cy.get("[role=option]").first().click();

    cy.get("button").within(() => {
      cy.get("svg").should("have.attr", "data-icon", "trash-2");
    });

    cy.get("button").find("svg[data-icon='trash-2']").click();

    // Products should be restored (no filter)
    cy.get("[data-testid=product-card]").should("have.length.greaterThan", 0);
  });

  it("should open the add product dialog", () => {
    cy.get("button").contains("Adicionar um produto").click();
    cy.contains("Novo Produto").should("exist");
  });

  it("should trigger logout on click", () => {
    cy.window().then((win) => {
      cy.stub(win.location, "assign").as("redirect");
    });

    cy.get("button").contains("Logout").click();
    cy.get("@redirect").should("have.been.called");
  });
});
