import { Locator, Page } from '@playwright/test';

export class DocumentsPage {
  readonly page: Page;
  readonly documents: Locator;
  readonly downloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documents = page.locator('[data-test="useradmin-document"]');
    this.downloadButton = page.locator('[data-test="useradmin-document-download"]');
  }

  async chooseDocument(title: string) {
    await this.page.locator('[data-test-selector="useradmin-document"]').filter({hasText: title}).click();
  }

  async downloadDocument() {
    await this.downloadButton.click();
    await this.page.waitForURL("**/cart/pricing");
  }
}