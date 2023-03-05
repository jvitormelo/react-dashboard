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
});

export {};
