import BasePage from "./BasePage";

class ExpensesPage extends BasePage {
  selectors = {
    addExpenseButton: 'button:contains("Add fuel expense")',
    expenseMileageInput: '#addExpenseMileage',
    expenseLitersInput: '#addExpenseLiters',
    expenseTotalCostInput: '#addExpenseTotalCost',
    submitAddExpense: '.modal-content button:contains("Add")',
    expensesTable: '.expenses_table',
    errorMessage: '.alert.alert-danger',
    modalContent: '.modal-content'
  };

  openExpenseModalFromGarage() {
    this.getElement(this.selectors.addExpenseButton)
    .first()
    .should('be.visible')
    .click();
  }

  addFuelExpense(mileage, liters, cost) {
    this.shouldBeVisible(this.selectors.modalContent);
    this.type(this.selectors.expenseMileageInput, mileage);
    this.type(this.selectors.expenseLitersInput, liters);
    this.type(this.selectors.expenseTotalCostInput, cost);
    this.getElement(this.selectors.submitAddExpense).click({ force: true });
  }

  verifyExpenseAdded() {
    this.shouldBeVisible(this.selectors.expensesTable);
  }

  verifyErrorIsShown() {
    this.shouldBeVisible(this.selectors.errorMessage);
  }
}

export default new ExpensesPage();
