import { Locator, Page } from '@playwright/test';

export class SidebarMenu {
  readonly page: Page;
  readonly documentsOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentsOption = page.locator('[data-test="menu-user-dashboard-documents"]');
  }

  async goToDocuments() {
    await this.documentsOption.click();
    await this.page.waitForURL("**/dashboard/documents");
  }
}