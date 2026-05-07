export default class BasePage {
  open(url = "/") {
    cy.visit(url, {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });
  }

  getElement(selector) {
    return cy.get(selector);
  }

  type(selector, text) {
    this.getElement(selector).should('be.visible').clear().type(text);
  }

  click(selector) {
    this.getElement(selector).should('be.visible').click();
  }

  shouldBeVisible(selector) {
    this.getElement(selector).should('be.visible');
  }
}
