describe("Unit spec", () => {
  it("Create", () => {
    cy.visit("/companies/1");

    cy.contains("button", "New Unit").click();

    const unitName = "Cypress E2E Unit";

    cy.get("input[name='name']").type(unitName);

    cy.get("button[type='submit']").should("not.be.disabled").click();

    cy.contains("Unit created successfully", { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", unitName).should("be.visible");
  });

  it("Delete", () => {
    cy.visit("/companies/1");

    cy.get("[data-cy=delete-icon]").first().click();

    cy.contains("button", "Yes").click();

    cy.contains("Unit deleted successfully", { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", "Jaguar E2E Unit").should("not.exist");
  });

  it("Edit", () => {
    cy.visit("/companies/1");

    cy.get("[data-cy=edit-icon]").first().click();

    const unitName = "Cypress E2E Unit Edited";

    cy.get("input[name='name']").clear().type(unitName);

    cy.get("button[type='submit']").should("not.be.disabled").click();

    cy.contains("Unit updated successfully", { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", unitName).should("be.visible");

    cy.contains("a", "Jaguar E2E Unit").should("not.exist");
  });
});

export {};
