import { Locator, Page, BrowserContext } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly context: BrowserContext;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.loginInput = page.locator('[data-test="auth-login-email"]');
    this.passwordInput = page.locator('[data-test="auth-login-password"]');
    this.submitButton = page.locator('[data-test="auth-login-submit"]');
  }

  async load() {
    await this.page.goto('https://app.interviewme.pl/login');
  }

  async login(login: string, password: string) {
    await this.context.addCookies([{name:"interviewme-cookie-consent", value: "{%22consent%22:{%22analytics%22:true%2C%22personalization%22:true%2C%22necessary%22:true%2C%22advertising%22:true}%2C%22accepted%22:true%2C%22dateAllowed%22:1685474014331}", url:"https://app.interviewme.pl"}]);
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}