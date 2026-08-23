import { test, expect } from '../../fixtures/pages.fixtures';
import { negativeTests as testcases } from './signup.data';
import { positiveTests as accountTests } from './signup.data'
import { generateUniqueEmail } from '../../utils/test-data.utils';
import { localeData } from '../../utils/locale.utils';
test.describe.parallel('Sign up page validation tests', () => {

  test.beforeEach(async({ signupPage }) => {
    await signupPage.goto();
  });

  test('name field validation', { tag: ['@signup-errors'] }, async ({ signupPage }) => {
    for (const { title, values, expectedErrors } of testcases.name) {
      await test.step(title, async () => {
        await signupPage.fillForm(values);
        await signupPage.clickCreateAccount();
        await expect.soft(signupPage.getFieldError('firstName')).toHaveText(expectedErrors.firstName);
        await expect.soft(signupPage.getFieldError('lastName')).toHaveText(expectedErrors.lastName);
      });
    }
  });

  test('password field validation', { tag: ['@signup-errors'] }, async ({ signupPage }) => {
    for (const { title, values, expectedErrors} of testcases.password) {
      await test.step(title, async () => {
        await signupPage.fillForm(values);
        await signupPage.clickCreateAccount();
        await expect.soft(signupPage.getFieldError('password')).toHaveText(expectedErrors.password);
      });
    }
  });

  test('email field validation', { tag: ['@signup-errors'] }, async ({ signupPage }) => {
    for (const { title, values, expectedErrors } of testcases.email) {
      await test.step(title, async () => {
        await signupPage.fillForm(values);
        await signupPage.clickCreateAccount();
        await expect.soft(signupPage.getFieldError('email')).toHaveText(expectedErrors.email);
      });
    }
  });

  test('form-level validation', { tag: ['@signup-errors'] }, async ({ signupPage }) => {
    for (const { title, values, expectedErrors } of testcases.common) {
      await test.step(title, async () => {
        await signupPage.fillForm(values);
        await signupPage.clickCreateAccount();
        for (const [field, error] of Object.entries(expectedErrors)) {
          await expect.soft(signupPage.getFieldError(field)).toHaveText(error);
        }
      });
    }
  });

  test('duplicate accounts cannot be created', { tag: ['@signup-errors'] }, async ({ page, signupPage }) => {
    const data = { ...accountTests[0].values, email: generateUniqueEmail() };
    await signupPage.fillForm(data);
    const response = await signupPage.submitAccountForm();
    expect(response.status()).toEqual(201);

    // verify duplicate account cannot be created
    await signupPage.goto();
    await signupPage.fillForm(data);
    await signupPage.clickCreateAccount();
    const errorMessage = await signupPage.getToastMessage();
    expect.soft(errorMessage).toContain(localeData.common.errorMessages.genericError);
  });
});