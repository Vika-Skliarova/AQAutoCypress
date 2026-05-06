import LoginPage from "../../pages/LoginPage";
import GaragePage from "../../pages/GaragePage";

describe("Garage UI Tests", () => {
  beforeEach(() => {
    LoginPage.open();
    cy.env(['username', 'password']).then((env) => {
      LoginPage.login(env.username, env.password);
    });
  });

  it("Should successfully add a new car", () => {
    const brand = 'BMW';
    const model = 'X5';
    const mileage = '100';
    
    GaragePage.verifyGarageOpened();
    GaragePage.addCar(brand, model, mileage);
    GaragePage.verifyCarInList(brand, model);
  });
});
