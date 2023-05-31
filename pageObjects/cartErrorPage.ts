import { Locator, Page, expect } from '@playwright/test';

export class CartErrorPage {
  readonly page: Page;
  readonly returnButton: Locator;
  readonly errorTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.returnButton = page.locator('[href="/cart/payment-details"]');
    this.errorTitle = page.locator('h4');
  }

  async checkError(errorTitle: string, errorMessages: string[]) {
    await this.page.waitForURL("**/cart/error", {timeout: 10000});
    await expect(this.errorTitle.filter({hasText: errorTitle})).toBeVisible();
    errorMessages.forEach(async errMsg => {
      const element = this.page.getByText(RegExp(`${errMsg}`));
      await expect(element).toBeVisible();
    });
    await expect(this.returnButton).toBeVisible();
    await expect(this.returnButton).toContainText("Wróć do metod płatności");
  }
}