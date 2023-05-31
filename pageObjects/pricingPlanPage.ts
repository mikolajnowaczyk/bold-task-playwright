import { Locator, Page } from '@playwright/test';

export class PricingPlanPage {
  readonly page: Page;
  readonly twoWeeksPlan: Locator;
  readonly quarterPlan: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.twoWeeksPlan = page.locator('[data-test-selector="cart-plan-choose"]').filter({hasText: "14-dniowy"});
    this.quarterPlan = page.locator('[data-test-selector="cart-plan-choose"]').filter({hasText: "kwartalny"});
    this.continueButton = page.locator('[data-test="cart-plan-continue"]');
  }

  async chooseTwoWeeksPlan() {
    await this.twoWeeksPlan.click();
  }

  async chooseQuarterPlan() {
    await this.quarterPlan.click();
  }

  async continue() {
    await this.continueButton.click();
    await this.page.waitForURL("**/cart/payment-details");
  }
}