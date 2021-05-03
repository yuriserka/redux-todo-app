describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test="home-page"]').should("be.visible");
  });

  it("should be possible to add a new todo", () => {
    cy.get('[data-test="input-todo-title"]').type("Learn Cypress");
    cy.get('[data-test="input-todo-description"]').type(
      "it's a powerful tool for automated e2e tests"
    );
    cy.get('[data-test="create-todo-form"]').submit();
    cy.get('[data-test="todo-list"]').should("be.visible");
  });

  it("should be possible to complete a todo", () => {
    cy.get('[data-test^="todo-"]').find('[data-test="check-todo"]').check();
    cy.get('[data-test="no-unfinished"]').should("be.visible");
  });

  it("should be possible to delete the todo", () => {
    cy.get('[data-test="btn-completed"]').click();
    cy.get('[data-test^="todo-"]').find('[data-test="delete-todo"]').click();
    cy.get('[data-test="no-finished"]').should("be.visible");
  });
});
