import { Locator, Page, expect } from '@playwright/test';

export class PaymentDetailsPage {
  readonly page: Page;
  readonly cardNumberInput: Locator;
  readonly ccvInput: Locator;
  readonly expiryDateInput: Locator;
  readonly cardHolderInput: Locator;
  readonly payButton: Locator;
  readonly visaLogo: Locator;
  readonly loader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.visaLogo = page.locator('[data-test="cart-credit-card-logos"]');
    this.cardNumberInput = page.frameLocator("#ccframe").locator('[name="ccNum"]');
    this.ccvInput = page.frameLocator("#ccframe").locator('#ccCVV');
    this.expiryDateInput = page.getByPlaceholder('MM/YY');
    this.cardHolderInput = page.locator('[name="cardholderName"]');
    this.payButton = page.locator('[data-test="cart-pay-securely"]');
    this.loader = page.locator('[data-test="loader"]');
  }

  async waitForInitialization(){
    await expect(this.visaLogo).toBeVisible();
    await expect(this.cardHolderInput).toBeVisible();
    await expect(this.ccvInput).toBeVisible();
    await expect(this.expiryDateInput).toBeVisible();
    await expect(this.cardHolderInput).toBeVisible();
    await expect(this.payButton).toBeVisible();
    await expect(this.payButton).not.toBeDisabled();
    for (const ldr of await this.loader.all()){
      await expect(ldr).not.toBeVisible(); 
    }
  }

  async fillCardDetails(cardNumber: string, expiry: string, ccv: string, holder: string) {
    await this.cardNumberInput.type(cardNumber, {delay: 25});;
    await this.ccvInput.type(ccv, {delay: 25});
    await this.expiryDateInput.type(expiry, {delay: 25});
    await this.cardHolderInput.clear();
    await this.cardHolderInput.type(holder, {delay: 25});  
  }

  async clickPay() {
    await this.payButton.click();
  }
}