import { test, expect, locale } from '../../fixtures/baseTest';
import { positiveTests as testcases } from './signup.data';
import { generateUniqueEmail } from '../../utils/test-data.utils';
const localeData = require(`../../data/locales/${locale}.json`);
const placeholders = localeData.signup.placeholders;

test.describe('Sign up page tests', () => {
  const successCases = [
    { name: 'with agreement opted out', data: testcases[0], tag: '@test1' },
    { name: 'with agreement opted in', data: testcases[1], tag: '@test5' },
  ];

  for (const { name, data, tag } of successCases) {
    test(`User can sign up successfully ${name}`, {tag: [tag] }, async ({ page, signupPage }) => {
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

  test('Sign up page default values', {tag: ['@test3'] },async ({ page, signupPage }) => {
    await signupPage.goto();
    await expect(signupPage.firstNameInput).toBeVisible();
    await expect(signupPage.lastNameInput).toBeVisible();
    await expect(signupPage.phoneInput).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
    await expect(signupPage.passwordConfirmationInput).toBeVisible();
    await expect(signupPage.provinceDropdown).toBeVisible();
    await expect(signupPage.image).toBeVisible();
    await expect(signupPage.loginLink).toBeVisible();
    await expect(signupPage.termsLink).toBeVisible();

    const displayedPlaceholders = await signupPage.getFieldPlaceholders();
    expect.soft(displayedPlaceholders['firstName']).toEqual(placeholders['firstName']);
    expect.soft(displayedPlaceholders['lastName']).toEqual(placeholders['lastName']);
    expect.soft(displayedPlaceholders['phoneNumber']).toEqual(placeholders['phoneNumber']);
    expect.soft(displayedPlaceholders['email']).toEqual(placeholders['email']);
    expect.soft(displayedPlaceholders['password']).toEqual(placeholders['password']);
    expect.soft(displayedPlaceholders['confirmPassword']).toEqual(placeholders['confirmPassword']);
    expect.soft(displayedPlaceholders['province']).toEqual(placeholders['province']);

    const passwordText = await signupPage.getPasswordCondition();
    const title = await signupPage.getPageTitle();
    const agreementText = await signupPage.getAgreementLabel();
    expect.soft(passwordText).toEqual(localeData.signup.passwordCriteria);
    expect.soft(title).toEqual(localeData.signup.pageTitle);
    expect.soft(agreementText).toEqual(localeData.signup.agreementText);

    const allProvinces = await signupPage.getAllProvinces();
    const actualProvinces = allProvinces.filter(p => p !== localeData.signup.placeholders.province);
    const expectedProvinces = Object.values(localeData.common.provinces);
    expect.soft(actualProvinces.sort()).toEqual(expectedProvinces.sort());
  });
});