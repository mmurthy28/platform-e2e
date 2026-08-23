import { Page } from '@playwright/test';
import { Header } from '../components/header';
import { locale, DEFAULT_APP_LOCALE } from '../utils/locale.utils';

export abstract class BasePage {
    readonly page: Page;
    readonly header: Header;

    constructor (page: Page) {
        this.page = page;
        this.header = new Header(page);
    }

    protected async goto(path: string) {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
        if (locale !== DEFAULT_APP_LOCALE) {
            await this.header.setLocale(locale);
        }
    }
}