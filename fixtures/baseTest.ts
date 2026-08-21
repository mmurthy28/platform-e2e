import { test as base } from '@playwright/test';
import { SignUpPage } from '../pages/signUpPage';

type Fixtures = {
    signupPage: SignUpPage;
};

export const test = base.extend<Fixtures>({
    signupPage: async ({ page }, use) => {
      const signupPage = new SignUpPage(page);
      await use(signupPage);
    }
});

export { expect } from '@playwright/test';