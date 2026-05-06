import LoginPage from "../../pages/LoginPage";

describe("Authentication Tests", () => {
  beforeEach(() => {
    LoginPage.open();
  });

  it("Should successfully login with valid credentials", () => {
    cy.env(['username', 'password']).then((env) => {
      LoginPage.login(env.username, env.password);
    });

    cy.url().should("include", "/panel/garage");
    cy.get('h1').should('contain.text', 'Garage');
  });

  it("Should show error message with incorrect password", () => {
    LoginPage.login("wrong@email.com", "WrongPass123");
    
    cy.get('.alert-danger').should('be.visible')
      .and('contain.text', 'Wrong email or password');
  });
});
