describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="home-page"]').should("be.visible");
  });

  it("should be possible to add a new todo", () => {
    cy.get('[data-testid="input-todo-title"]').type("Learn Cypress");
    cy.get('[data-testid="input-todo-description"]').type(
      "it's a powerful tool for automated e2e tests"
    );
    cy.get('[data-testid="create-todo-form"]').submit();
    cy.get('[data-testid="todo-list"]').should("be.visible");
  });

  it("should be possible to complete a todo", () => {
    cy.get('[data-testid^="todo-"]').find('[data-testid="check-todo"]').check();
    cy.get('[data-testid="no-unfinished"]').should("be.visible");
  });

  it("should be possible to delete the todo", () => {
    cy.get('[data-testid="btn-completed"]').click();
    cy.get('[data-testid^="todo-"]').find('[data-testid="delete-todo"]').click();
    cy.get('[data-testid="no-finished"]').should("be.visible");
  });
});
