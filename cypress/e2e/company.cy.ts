// because the API is mocked i'm not mocking the request and response
// and because of the time i will make really simple tests, i also want to some units tests and component tests

describe("Company spec", () => {
  it("Create", () => {
    cy.visit("/");

    const createCompany = cy.contains("button", "New Company");

    createCompany.should("be.visible").and("be.enabled");

    createCompany.click();

    const companyName = cy.get("input[name='name']");

    companyName.should("be.visible");

    companyName.type("Test Company");

    const submitButton = cy.get("button[type='submit']");

    submitButton.should("be.visible").and("be.enabled");

    submitButton.click();

    cy.contains("Company Test Company created!", { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", "Test Company").should("be.visible");
  });

  it("Delete", () => {
    cy.visit("/");

    const deleteCompany = cy.get("[data-cy=delete-icon]");

    deleteCompany.should("be.visible");

    deleteCompany.click();

    cy.contains("button", "Yes").click();

    cy.contains("Company The Test Company deleted!", { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", "The Test Company").should("not.exist");
  });

  it("Edit", () => {
    cy.visit("/");

    const editCompany = cy.get("[data-cy=edit-icon]");

    editCompany.should("be.visible");

    editCompany.click();

    const companyName = cy.get("input[name='name']");

    companyName.should("be.visible");

    companyName.clear();

    const newName = "Edit Test Company";

    companyName.type(newName);

    const submitButton = cy.get("button[type='submit']");

    submitButton.should("be.visible").and("be.enabled");

    submitButton.click();

    cy.contains(`Company ${newName} updated!`, { timeout: 5000 }).should(
      "be.visible"
    );

    cy.contains("a", "The Test Company").should("not.exist");
    cy.contains("a", newName).should("exist");
  });
});

export {};
