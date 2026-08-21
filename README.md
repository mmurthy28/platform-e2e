# Platform E2E
## End-to-end test automation framework built using [Playwright](https://playwright.dev/) and TypeScript.

## Installation

### Clone the repository:
```
git clone https://github.com/mmurthy28/platform-e2e.git
cd platform-e2e
```

### Install dependencies:
```
npm install
```

### Install Playwright browsers:
```
npx playwright install
```

### Running tests:

### To run all tests, execute the following command in the terminal:
```
npx playwright test
```

### To run all tests for a supported locale (en/fr), default is en:
```
LOCALE=fr npx playwright test 
```

### To run a specific test:
```
npx playwright test tests/signup/signup.spec.ts
```

### To run all tests in a specific environment (development/staging), default is development:
```
NODE_ENV=development LOCALE=fr npx playwright test 
```

### Github actions

Run the following [workflow] https://github.com/mmurthy28/platform-e2e/actions/workflows/playwright.yml after selecting locale (en/fr) in the dropdown


### Test Reports

After local test execution, generate/open the Playwright HTML report:
```
npx playwright show-report
```