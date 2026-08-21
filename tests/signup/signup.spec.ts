import { test, expect } from '../../fixtures/baseTest';
import { positiveTests as testcases, countriesTotal } from './signup.data';
import { generateUniqueEmail } from '../../utils/test-data.utils';
import { localeData } from '../../utils/locale.utils';
const placeholders = localeData.signup.placeholders;

test.describe('Signup page tests', () => {
  const successCases = [
    { name: 'with agreement opted out', data: testcases[0] },
    { name: 'with agreement opted in', data: testcases[1] }
  ];

  for (const { name, data } of successCases) {
    test(`User can sign up successfully ${name}`, { tag: ['@signup-success'] }, async ({ page, signupPage }) => {
      const validUser = { ...data.values, email: generateUniqueEmail() };
      await signupPage.goto();
      await signupPage.fillForm(validUser);
      const response = await signupPage.submitAccountForm();

      // Validate API response
      expect(response.status()).toEqual(201);
      const responseBody = await response.json();
      const account = responseBody.account;
      expect.soft(account.email).toEqual(validUser['email']);
      expect.soft(account.firstName).toEqual(validUser['firstName'].trim());
      expect.soft(account.lastName).toEqual(validUser['lastName'].trim());
      expect.soft(account.phone).toEqual(validUser['phoneNumber']);
      expect.soft(account.region).toEqual(validUser['region']);
      expect.soft(account.leadDistributeConsentAgreement).toEqual(!!validUser['agreement']);

      // Check navigation on success
      await page.waitForURL('**/getaquote**');
    });
  }

  test('Sign up page default values', { tag: ['@signup-default'] },async ({ signupPage }) => {
    await signupPage.goto();

    await test.step('form fields are visible', async () => {
      await expect.soft(signupPage.firstNameInput).toBeVisible();
      await expect.soft(signupPage.lastNameInput).toBeVisible();
      await expect.soft(signupPage.phoneInput).toBeVisible();
      await expect.soft(signupPage.emailInput).toBeVisible();
      await expect.soft(signupPage.passwordInput).toBeVisible();
      await expect.soft(signupPage.passwordConfirmationInput).toBeVisible();
      await expect.soft(signupPage.provinceDropdown).toBeVisible();
      await expect.soft(signupPage.image).toBeVisible();
      await expect.soft(signupPage.loginLink).toBeVisible();
      await expect.soft(signupPage.termsLink).toBeVisible();
      await expect.soft(signupPage.countrySelector).toBeVisible();
    });

    await test.step('placeholders are displayed based on locale', async () => {
      const displayedPlaceholders = await signupPage.getFieldPlaceholders();
      expect.soft(displayedPlaceholders['firstName']).toEqual(placeholders['firstName']);
      expect.soft(displayedPlaceholders['lastName']).toEqual(placeholders['lastName']);
      expect.soft(displayedPlaceholders['phoneNumber']).toEqual(placeholders['phoneNumber']);
      expect.soft(displayedPlaceholders['email']).toEqual(placeholders['email']);
      expect.soft(displayedPlaceholders['password']).toEqual(placeholders['password']);
      expect.soft(displayedPlaceholders['confirmPassword']).toEqual(placeholders['confirmPassword']);
      expect.soft(displayedPlaceholders['province']).toEqual(placeholders['province']);
    });

    await test.step('Check header, password field and agreement checkbox labels', async () => {
      const passwordText = await signupPage.getPasswordCondition();
      const title = await signupPage.getPageTitle();
      const agreementText = await signupPage.getAgreementLabel();
      expect.soft(passwordText).toEqual(localeData.signup.passwordCriteria);
      expect.soft(title).toEqual(localeData.signup.pageTitle);
      expect.soft(agreementText).toEqual(localeData.signup.agreementText);
    });

    await test.step('province/countries dropdown are populated correctly', async () => {
      const allProvinces = await signupPage.getAllProvinces();
      const actualProvinces = allProvinces.filter(p => p !== localeData.signup.placeholders.province);
      const expectedProvinces = Object.values(localeData.common.provinces);
      expect.soft(actualProvinces.sort()).toEqual(expectedProvinces.sort());
      const countries = await signupPage.getAllCountries();
      expect.soft(countries.length).toEqual(countriesTotal);
    });
  });
});