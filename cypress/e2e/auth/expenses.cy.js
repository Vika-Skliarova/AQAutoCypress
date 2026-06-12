import LoginPage from "../../pages/LoginPage";
import GaragePage from "../../pages/GaragePage";
import ExpensesPage from "../../pages/ExpensesPage";

describe("Fuel Expenses Tests", () => {
  
  beforeEach(() => {
    LoginPage.open();

    const username = Cypress.env('username');
    const password = Cypress.env('password');
    
    LoginPage.login(username, password);
    
    cy.url().should('include', '/garage');

    GaragePage.addCarIfNotExist(); 
    
    cy.get('body').then(($body) => {
      if ($body.find('.modal-dialog').length > 0) {
        cy.get('button').contains('Cancel').click({ force: true });
      }
    });
  });

  it("Should successfully add fuel expense", () => {
    const randomMileage = Math.floor(Math.random() * 899000) + 1000;

    ExpensesPage.openExpenseModalFromGarage();
    ExpensesPage.addFuelExpense(randomMileage.toString(), "20", "500");
    ExpensesPage.verifyExpenseAdded();
  });

  it("Should show error message when mileage is invalid", () => {
    ExpensesPage.openExpenseModalFromGarage();
    ExpensesPage.addFuelExpense("1", "10", "100");
    ExpensesPage.verifyErrorIsShown();
  });
});