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

Run the following workflow after selecting locale (en/fr) in the dropdown
https://github.com/mmurthy28/platform-e2e/actions/workflows/playwright.yml 

#### The test report will be available for 30 days under Artifacts section

### Test Reports

After local test execution, generate/open the Playwright HTML report:
```
npx playwright show-report
```

### Project Structure
 
```
platform-e2e/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI pipeline configuration
├── components/
│   └── header.ts                 # Shared components across pages
├── data/                         # Static/reference test data
├── fixtures/
│   └── pages.fixtures.ts         # Custom Playwright fixtures wiring up page objects
├── pages/
│   ├── basePage.ts               # Abstract base class shared by all page objects
│   └── signUpPage.ts             # Sign-up page object
├── tests/
│   └── signup/
│       ├── signup-validation-e2e.spec.ts  # Sign-up validation test cases
│       ├── signup-data.ts        # Test data for sign-up specs
│       └── signup.spec.ts        # Core sign-up flow tests
├── utils/                        # Shared helpers
├── .env.development              # Environment variables — development
├── .env.staging                  # Environment variables — staging
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts          # Playwright test runner configuration
└── README.md
```

### Framework features

* **Page Object Model (POM)** – Encapsulates page locators and actions to improve maintainability and reduce code duplication.
* **Reusable Test Fixtures** – Provides shared and reusable test dependencies through Playwright fixtures.
* **Test Data Management** – Separates test data from test logic using structured data files and dynamically generated data where required.
* **Environment Configuration** – Supports environment-specific configuration (.env files)
* **Robust Locators** – Uses accessible and stable locators such as test IDs rather than brittle CSS/XPath selectors.
* **Built-in Auto-Waiting** – Leverages Playwright's automatic waiting and web-first assertions instead of unnecessary hard waits.
* **Reusable Utilities** – Common operations such as unique email generation is centralized in utilities.
* **Test Tagging and Filtering** – Supports organizing and selectively executing tests using tags
* **Trace, Screenshot Support** – Captures debugging artifacts for failed tests to simplify failure investigation.
* **Detailed Test Reporting** – Generates Playwright HTML reports with test results, errors, traces, and execution details.
* **CI/CD Integration** – Designed to run reliably in CI pipelines such as GitHub Actions.
* **Independent and Isolated Tests** – Tests are designed to minimize dependencies between test cases and support reliable parallel execution.
* **Multi-Locale Testing** – Supports testing the application across multiple locales (en/fr) through configurable locale settings and locale-specific test data.