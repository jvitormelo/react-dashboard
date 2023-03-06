describe("Asset spec", () => {
  it("Create", () => {
    cy.visit("/companies/1/units/1");

    cy.contains("button", "New Asset").click();

    const assetName = "Cypress E2E Asset";

    cy.get("input[name='name']").type(assetName);

    cy.get("button[type='submit']").should("not.be.disabled").click();

    // click in the Model select and select the first option
    cy.get("input[role='combobox']").first().click();

    cy.type("{enter}");

    cy.get("div[role");

    cy.contains("Asset created successfully", { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", assetName).should("be.visible");
  });
});

export {};
