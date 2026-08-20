import { test, expect, locale } from '../../fixtures/baseTest';
import { negativeTests as testcases } from './signup.data';

test.describe('Sign up page field validation error tests', () => {

  test.beforeEach(async({ signupPage }) => {
    await signupPage.goto();
  });

  for (const { title, values, expectedErrors } of testcases) {
    test(title, { tag: ['@test2'] }, async ({ signupPage }) => {
      await signupPage.fillForm(values);
      await signupPage.clickCreateAccount();
      for (const [field, error] of Object.entries(expectedErrors)) {
        await expect.soft(signupPage.getFieldError(field)).toHaveText(error);
      }
    });
  }
});