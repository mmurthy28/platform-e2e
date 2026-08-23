import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export type SignUpFormData = {
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string,
    province?: string,
    region?: string,
    password?: string,
    confirmPassword?: string,
    agreement?: boolean
}

export class SignUpPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly signUpButton: Locator;
    readonly phoneInput: Locator;
    readonly provinceDropdown: Locator;
    readonly provinceLabel: Locator;
    readonly passwordInput: Locator;
    readonly passwordConfirmationInput: Locator;
    readonly agreementCheckbox: Locator;
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly phoneError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly confirmPasswordError: Locator;
    readonly pageTitle: Locator;
    readonly agreementLabel: Locator;
    readonly image: Locator;
    readonly loginLink: Locator;
    readonly termsLink: Locator;
    readonly countrySelector: Locator;
    readonly toast: Locator;

    constructor (page: Page) {
        super(page);
        this.firstNameInput = page.getByTestId('first-name-input');
        this.lastNameInput = page.getByTestId('last-name-input');
        this.emailInput = page.getByTestId('email-input');
        this.phoneInput = page.getByTestId('phoneInput');
        this.passwordInput = page.getByTestId('password-input');
        this.passwordConfirmationInput = page.getByTestId('passwordConfirmation-input');
        this.provinceDropdown = page.getByTestId('region-select');
        this.provinceLabel = page.getByTestId('select-placeholder');
        this.signUpButton = page.getByTestId('submit-button');
        this.agreementCheckbox = page.getByTestId('agreement-checkbox');
        this.image = page.getByAltText('nesto secure');
        this.loginLink = page.getByTestId('login-link');
        this.termsLink = page.getByTestId('terms-link');
        this.firstNameError = page.getByTestId('first-name-error-message-typography');
        this.lastNameError = page.getByTestId('last-name-error-message-typography');
        this.phoneError = page.getByTestId('phone-error-message-typography');
        this.emailError = page.getByTestId('email-error-message-typography');
        this.passwordError = page.getByTestId('password-error-message-typography');
        this.confirmPasswordError = page.getByTestId('passwordConfirmation-error-message-typography');
        this.pageTitle = page.getByRole('heading', { level: 2 });
        this.agreementLabel = page.locator('label[for="leadDistributeConsentAgreement"]');
        this.countrySelector = page.locator('select[name="phoneCountry"]');
        this.toast = page.locator('div[role="alert"]');
    }

    async goto() {
        await super.goto('/signup');
        await this.pageTitle.waitFor();
    }

    async clickCreateAccount() {
        await this.signUpButton.click();
    }

    async fillFormField(locator: Locator, value: string) {
        await locator.clear();
        await locator.fill(value);
    }

    async fillForm(data: SignUpFormData) {
        if (data.lastName !== undefined) {
            await this.fillFormField(this.lastNameInput, data.lastName);
        }
        if (data.firstName !== undefined) {
            await this.fillFormField(this.firstNameInput, data.firstName);
        }
        if (data.phoneNumber !== undefined) {
            await this.fillFormField(this.phoneInput, data.phoneNumber);
        }
        if (data.password !== undefined) {
            await this.fillFormField(this.passwordInput, data.password);
        }
        if (data.confirmPassword !== undefined) {
            await this.fillFormField(this.passwordConfirmationInput, data.confirmPassword);
        }
        if (data.email !== undefined) {
            await this.fillFormField(this.emailInput, data.email);
        }
        if (data.region !== undefined) {
            await this.provinceDropdown.selectOption(data.region);
        }
        if (data.agreement !== undefined) {
            data.agreement
                ? await this.agreementCheckbox.check()
                : await this.agreementCheckbox.uncheck();
        }
    }

    async submitAccountForm() {
        const [response] = await Promise.all([
            this.page.waitForResponse(response => 
              response.url().includes('/api/accounts') && response.request().method() === 'POST'
            ),
            this.signUpButton.click()
        ]);
        return response;
    }

    getFieldError(field: string) {
        const map: Record<string, Locator> = {
            firstName: this.firstNameError,
            lastName: this.lastNameError,
            phoneNumber: this.phoneError,
            email: this.emailError,
            password: this.passwordError,
            confirmPassword: this.confirmPasswordError,
        };
        const locator = map[field];
        return locator;
    }

    async getPageTitle(): Promise<string> {
        await this.pageTitle.waitFor();
        const title = await this.pageTitle.innerText();
        return title;
    }

    async getAgreementLabel(): Promise<string> {
        await this.agreementLabel.waitFor();
        const text = await this.agreementLabel.innerText();
        return text;
    }

    async getPasswordCondition(): Promise<string> {
        const passwordInfo = this.page.locator('div[role]')
            .filter({ has: this.passwordInput })
            .locator('span[data-testid="typography"]');
        return passwordInfo.innerText();
    }

    async getFieldPlaceholders(): Promise<Record<string, string>> {
        const placeholders: Record<string, string> = {}
        const data: Record<string, Locator> = {
            firstName: this.firstNameInput,
            lastName: this.lastNameInput,
            phoneNumber: this.phoneInput,
            email: this.emailInput,
            password: this.passwordInput,
            confirmPassword: this.passwordConfirmationInput,
            province: this.provinceLabel
        };
        for (const [field, locator] of Object.entries(data)) {
            let value = (field !== 'province')? 
                await locator.getAttribute('placeholder') : await locator.innerText();
            placeholders[field] = value ?? '';
        }
        return placeholders;
    }

    async getAllProvinces(): Promise<string[]> {
        const optionLabels: string[] = await this.provinceDropdown.locator('option').allTextContents();
        return optionLabels;
    }

    async getAllCountries(): Promise<string[]> {
        const optionLabels: string[] = await this.countrySelector.locator('option').allTextContents();
        return optionLabels;
    }

    async getToastMessage(): Promise<string> {
        await this.toast.waitFor();
        const message = (await this.toast.allInnerTexts()).join('');
        return message;
    }
}