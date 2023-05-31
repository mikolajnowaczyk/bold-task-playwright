import { test } from '@playwright/test';
import {LoginPage} from "../pageObjects/loginPage";
import {SidebarMenu} from "../pageObjects/sidebrMenu";
import {DocumentsPage} from "../pageObjects/documentsPage";
import {PricingPlanPage} from "../pageObjects/pricingPlanPage";
import {PaymentDetailsPage} from "../pageObjects/paymentDetailsPage";
import {CartErrorPage} from "../pageObjects/cartErrorPage";

import invalidCardDetails from '../fixtures/invalidCardDetails.json'; 
import loginCredentials from '../fixtures/loginCredentials.json'; 

test.beforeEach(async ({ page, context }) => {
  const loginPage = new LoginPage(page, context);
  await loginPage.load();
  await loginPage.login(loginCredentials.login, loginCredentials.password);
})

test('Failed payment flow', async ({ page }) => {
  const sidebarMenu = new SidebarMenu(page);
  const documents = new DocumentsPage(page);
  const pricingPlan = new PricingPlanPage(page);
  const paymentDetails = new PaymentDetailsPage(page);
  const cartError = new CartErrorPage(page);
  // go to documents
  await sidebarMenu.goToDocuments();
  // search document and download
  await documents.chooseDocument("CV - TEST")
  await documents.downloadDocument();
  // choose quarter plan and continue
  await pricingPlan.chooseQuarterPlan();
  await pricingPlan.continue();
  // card details
  await paymentDetails.waitForInitialization();
  await paymentDetails.fillCardDetails(
    invalidCardDetails.cardNumber.toString(),
    invalidCardDetails.expiryDate,
    invalidCardDetails.ccv.toString(),
    invalidCardDetails.cardHolder);
  await paymentDetails.clickPay();
  await cartError.checkError("Coś poszło nie tak z Twoją płatnością", ["Twoja płatność nie mogła zostać zrealizowana.", "Sprawdź swoje dane do płatności lub spróbuj jeszcze raz inną metodą płatności."]);
});