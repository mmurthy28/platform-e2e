import { Page, Locator } from '@playwright/test'
export class Header {
    readonly page: Page;
    readonly localeSwitcher: Locator;
    constructor(page: Page) {
        this.page = page;
        this.localeSwitcher = this.page.getByTestId('header-language-switch');
    }
  
    async setLocale(locale: string) {
        const targetLocale = locale;
        const switcherText = await this.localeSwitcher.textContent();
        if (switcherText?.toLowerCase() === targetLocale) {
            await Promise.all([
                this.page.waitForResponse(res => res.url().includes(`/${targetLocale}/`) && res.status() === 200),
                this.localeSwitcher.click()
            ]);
        }
    }
  }