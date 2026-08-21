import { test, expect } from '../../fixtures/baseTest';
import { negativeTests as testcases } from './signup.data';
import { positiveTests as accountTests } from './signup.data'
import { generateUniqueEmail } from '../../utils/test-data.utils';
import { localeData } from '../../utils/locale.utils';
test.describe('Sign up page validation tests', () => {

  test.beforeEach(async({ signupPage }) => {
    await signupPage.goto();
  });

  for (const { title, values, expectedErrors } of testcases) {
    test(title, { tag: ['@signup-errors'] }, async ({ signupPage }) => {
      await signupPage.fillForm(values);
      await signupPage.clickCreateAccount();
      for (const [field, error] of Object.entries(expectedErrors)) {
        await expect.soft(signupPage.getFieldError(field)).toHaveText(error);
      }
    });
  }

  test('duplicate accounts cannot be created', { tag: ['@signup-errors'] }, async ({ page, signupPage }) => {
    const data = accountTests[0].values;
    data['email'] = generateUniqueEmail();
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