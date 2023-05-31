import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  await page.goto('https://app.interviewme.pl/login');
  await context.addCookies([{name:"interviewme-cookie-consent", value: "{%22consent%22:{%22analytics%22:true%2C%22personalization%22:true%2C%22necessary%22:true%2C%22advertising%22:true}%2C%22accepted%22:true%2C%22dateAllowed%22:1685474014331}", url:"https://app.interviewme.pl"}]);
  //login
  await page.locator('[data-test="auth-login-email"]').type('LOGIN');
  await page.locator('[data-test="auth-login-password"]').type('PASSWORD');
  await page.locator('[data-test="auth-login-submit"]').click();
})

test('failed payment flow', async ({ page }) => {
  // go to documents
  await page.locator('[data-test="menu-user-dashboard-documents"]').click();
  // search document and download
  await page.locator('[data-test-selector="useradmin-document"]').filter({hasText: "CV - TEST"}).click();
  await page.locator('[data-test="useradmin-document-download"]').click();
  // continue
  await page.locator('[data-test="cart-plan-continue"]').click();
  // card details
  await page.frameLocator("#ccframe").locator('[name="ccNum"]').fill("4000 0000 0000 0051");
  await page.getByPlaceholder('MM/YY').fill("10/23");
  await page.frameLocator("#ccframe").locator('#ccCVV').fill("123");
  await page.locator('[name="cardholderName"]').fill("Vincent Testowy");
  // pay
  await page.locator('[data-test="cart-pay-securely"]').click();  
  await expect(page.getByText("Coś poszło nie tak z Twoją płatnością")).toBeVisible();
  await expect(page.getByText("Twoja płatność nie mogła zostać zrealizowana.")).toBeVisible();
  await expect(page.getByText("Sprawdź swoje dane do płatności lub spróbuj jeszcze raz inną metodą płatności.")).toBeVisible();
  await expect(page.getByText("Wróć do metod płatności")).toBeVisible();
});