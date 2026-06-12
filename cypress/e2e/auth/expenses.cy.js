import LoginPage from "../../pages/LoginPage";
import GaragePage from "../../pages/GaragePage";
import ExpensesPage from "../../pages/ExpensesPage";

describe("Fuel Expenses Tests", () => {
  
  beforeEach(() => {
    LoginPage.open();
    cy.env(['username', 'password']).then((env) => {
      LoginPage.login(env.username, env.password);
    });
    cy.url().should('include', '/garage');

    GaragePage.addCarIfNotExist(); 
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