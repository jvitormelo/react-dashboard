describe("Asset spec", () => {
  it("Create", () => {
    cy.visit("/companies/1/units/1");

    cy.contains("button", "New Asset").click();

    const assetName = "Cypress E2E Asset";

    cy.get("input[name='name']").type(assetName);

    cy.get("button[type='submit']").should("not.be.disabled").click();

    // click in the Model select and select the first option
    cy.get("input[role='combobox']")
      .first()
      .click()
      .type("{enter}", { force: true });

    cy.get("input[role='combobox']")
      .last()
      .click()
      .type("{enter}", { force: true })
      .type("{esc}", { force: true });

    cy.get("input[name='specifications.maxTemp']").type("50");

    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.get("input[type=file]").selectFile(
      {
        contents: "cypress/fixtures/asset.jpeg",
        mimeType: "image/jpeg",
      },
      { force: true }
    );

    cy.contains("button", "Create Asset").click();

    cy.contains("Asset created", { timeout: 5000 }).should("be.visible");

    cy.contains("a", assetName).should("be.visible");
  });
});

export {};
