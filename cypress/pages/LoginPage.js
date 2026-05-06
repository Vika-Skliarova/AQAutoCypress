import BasePage from "./BasePage";

class LoginPage extends BasePage {
  selectors = {
    signInButton: "button.header_signin",
    emailInput: "#signinEmail",
    passwordInput: "#signinPassword",
    loginSubmitButton: ".modal-footer .btn-primary",
  };

  login(email, password) {
    this.click(this.selectors.signInButton);
    this.type(this.selectors.emailInput, email);
    this.type(this.selectors.passwordInput, password);
    this.click(this.selectors.loginSubmitButton);
  }

  verifyLoginPageOpened() {
    this.shouldBeVisible(this.selectors.signInButton);
  }
}

export default new LoginPage();
