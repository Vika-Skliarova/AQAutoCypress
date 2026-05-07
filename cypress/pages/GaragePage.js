import BasePage from "./BasePage";

class GaragePage extends BasePage {
  selectors = {
    addCarButton: 'button:contains("Add car")',
    brandSelect: '#addCarBrand',
    modelSelect: '#addCarModel',
    mileageInput: '#addCarMileage',
    submitAddCar: '.modal-footer button:contains("Add")',
    garageTitle: 'h1',
    addExpenseButton: 'button:contains("Add fuel expense")',
    carList: '.car-list'
  };

  addCar(brand, model, mileage) {
    this.click(this.selectors.addCarButton);
    this.getElement(this.selectors.brandSelect).select(brand);
    this.getElement(this.selectors.modelSelect).select(model);
    this.type(this.selectors.mileageInput, mileage);
    this.click(this.selectors.submitAddCar);
  }

  addCarIfNotExist(brand = 'BMW', model = 'X5', mileage = '100') {
    this.getElement('body').then(($body) => {
      if ($body.find(this.selectors.addExpenseButton).length === 0) {
        this.addCar(brand, model, mileage);
        this.shouldBeVisible(this.selectors.addExpenseButton);
      }
    });
  }

  verifyGarageOpened() {
    this.getElement(this.selectors.garageTitle).should('contain.text', 'Garage');
  }

  verifyCarInList(brand, model) {
    this.getElement(this.selectors.carList)
      .should('contain.text', brand)
      .and('contain.text', model);
  }
}

export default new GaragePage();
