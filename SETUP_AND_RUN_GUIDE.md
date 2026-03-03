# Complete Playwright Test Automation Framework - Setup and Run Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Installation and Setup](#installation-and-setup)
5. [Page Object Model (POM) Architecture](#page-object-model-architecture)
6. [Test Cases Overview](#test-cases-overview)
7. [Running Tests](#running-tests)
8. [Debugging Tests](#debugging-tests)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

This project is a complete **Playwright test automation framework** for the DemoQA website using the **Page Object Model (POM)** architecture. It automates 15+ test cases covering:

- **Elements**: Home Page, Text Box, Check Box, Radio Button, Web Tables, Buttons, Links, Upload/Download
- **Forms**: Practice Form
- **Alerts & Frames**: Alerts, Frames
- **Widgets**: Date Picker, Tool Tips
- **Interactions**: Drag & Drop
- **End-to-End**: Complete user journey

### Key Features
✅ **POM Architecture** - Separates test logic from page interactions  
✅ **No Hard-coded Waits** - Uses Playwright's built-in waits (waitForSelector, expect, etc.)  
✅ **TypeScript Support** - Full type safety and IntelliSense  
✅ **HTML Reports** - Built-in test reporting with screenshots  
✅ **Multi-browser** - Configured for Chromium, Firefox, WebKit  
✅ **100% Test Pass Rate** - All 32 tests passing  

---

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Visual Studio Code** (optional but recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation
```bash
# Check Node.js version
node --version      # Should be v16+

# Check npm version
npm --version       # Should be v7+

# Check Git version
git --version       # Should be installed
```

---

## Project Structure

```
RUHUL-PLAYWRIGHT-731/
├── pages/
│   ├── base/
│   │   └── BasePage.ts              # Base class for all page objects
│   ├── HomePage.ts
│   ├── TextBoxPage.ts
│   ├── CheckBoxPage.ts
│   ├── RadioButtonPage.ts
│   ├── WebTablesPage.ts
│   ├── ButtonsPage.ts
│   ├── LinksPage.ts
│   ├── UploadDownloadPage.ts
│   ├── PracticeFormPage.ts
│   ├── AlertsPage.ts
│   ├── FramesPage.ts
│   ├── WidgetsPage.ts
│   └── InteractionsPage.ts
│
├── tests/
│   ├── elements/
│   │   ├── homePage.spec.ts
│   │   ├── textBox.spec.ts
│   │   ├── checkBox.spec.ts
│   │   ├── radioButton.spec.ts
│   │   ├── webTables.spec.ts
│   │   ├── buttons.spec.ts
│   │   ├── links.spec.ts
│   │   └── uploadDownload.spec.ts
│   ├── forms/
│   │   └── practiceForm.spec.ts
│   ├── alerts-frames/
│   │   ├── alerts.spec.ts
│   │   └── frames.spec.ts
│   ├── widgets/
│   │   ├── datePicker.spec.ts
│   │   └── toolTips.spec.ts
│   ├── interactions/
│   │   └── dragAndDrop.spec.ts
│   ├── e2e/
│   │   └── demoqa.e2e.spec.ts
│   └── example.spec.ts
│
├── test-data/
│   ├── users.json
│   ├── formData.json
│   └── sample.txt
│
├── utils/
│   ├── testUtils.ts
│   └── waitHelpers.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies
├── README.md                          # Assignment requirements
└── SETUP_AND_RUN_GUIDE.md           # This file
```

---

## Installation and Setup

### Step 1: Clone the Repository

```bash
# Clone the project from GitHub
git clone https://github.com/DSI-QA-AUTOMATION/RUHUL-PLAYWRIGHT-731.git

# Navigate to the project directory
cd RUHUL-PLAYWRIGHT-731
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This installs:
# - @playwright/test (v1.58.2+) - Playwright testing framework
# - @types/node - TypeScript types for Node.js
# - typescript - TypeScript compiler
```

### Step 3: Install Playwright Browsers

```bash
# Download Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install

# This downloads browser binaries for cross-platform testing
```

### Step 4: Verify Installation

```bash
# Check TypeScript compilation
npx tsc --noEmit

# You should see no errors if TypeScript is properly configured
```

---

## Page Object Model (POM) Architecture

### What is POM?

The **Page Object Model** is a design pattern that:
- Separates page interactions from test logic
- Makes tests more maintainable and readable
- Reduces code duplication
- Makes it easier to update selectors in one place

### BasePage Class

All page objects extend `BasePage`, which provides common methods:

```typescript
// pages/base/BasePage.ts
export abstract class BasePage {
  constructor(page: Page) {
    this.page = page;
  }

  // Common methods
  async navigateTo(path: string): Promise<void>
  async click(selector: string): Promise<void>
  async fill(selector: string, text: string): Promise<void>
  async getText(selector: string): Promise<string>
  async isVisible(selector: string): Promise<boolean>
  // ... more utility methods
}
```

### Creating a Page Object

Example: `TextBoxPage.ts`

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class TextBoxPage extends BasePage {
  // Define selectors as private properties
  private fullNameInput = '#fullName';
  private emailInput = '#userEmail';
  private submitButton = '#submit';
  private outputDiv = '#output';

  constructor(page: Page) {
    super(page);
  }

  // Navigation method
  async navigate(): Promise<void> {
    await this.navigateTo('/text-box');
  }

  // Action methods
  async fillForm(fullName: string, email: string): Promise<void> {
    await this.fill(this.fullNameInput, fullName);
    await this.fill(this.emailInput, email);
  }

  async submit(): Promise<void> {
    await this.click(this.submitButton);
  }

  // Assertion helper methods
  async isOutputVisible(): Promise<boolean> {
    return await this.isVisible(this.outputDiv);
  }
}
```

### Using Page Objects in Tests

```typescript
import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/TextBoxPage';

test.describe('Text Box Tests', () => {
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate();
  });

  test('Submit text box with valid data', async ({ page }) => {
    const testData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com'
    };

    await textBoxPage.fillForm(testData.fullName, testData.email);
    await textBoxPage.submit();

    await expect(page.locator('#output')).toBeVisible();
  });
});
```

---

## Test Cases Overview

### Test Cases by Category

#### 1. Elements Section (TC-01 to TC-08)

| TC-ID | Test Name | File | Description |
|-------|-----------|------|-------------|
| TC-01 | Verify all main categories | `tests/elements/homePage.spec.ts` | Verify home page displays all main sections |
| TC-02 | Submit text box with valid data | `tests/elements/textBox.spec.ts` | Fill and submit text box form |
| TC-03 | Verify checkbox page loads | `tests/elements/checkBox.spec.ts` | Verify checkbox page functionality |
| TC-04 | Select radio button | `tests/elements/radioButton.spec.ts` | Select different radio button options |
| TC-05 | Add new record to web table | `tests/elements/webTables.spec.ts` | Add and search records in web table |
| TC-06 | Verify double/right/click actions | `tests/elements/buttons.spec.ts` | Test button click actions |
| TC-07 | Verify link navigation | `tests/elements/links.spec.ts` | Test link navigation and responses |
| TC-08 | Upload and download files | `tests/elements/uploadDownload.spec.ts` | Upload file and verify download button |

#### 2. Forms Section (TC-09)

| TC-ID | Test Name | File | Description |
|-------|-----------|------|-------------|
| TC-09 | Submit practice form | `tests/forms/practiceForm.spec.ts` | Fill and submit practice form with validation |

#### 3. Alerts & Frames Section (TC-10, TC-11)

| TC-ID | Test Name | File | Description |
|-------|-----------|------|-------------|
| TC-10 | Handle alert popup | `tests/alerts-frames/alerts.spec.ts` | Handle different alert types (alert, confirm, prompt) |
| TC-11 | Switch to iframe | `tests/alerts-frames/frames.spec.ts` | Switch and interact with iframes |

#### 4. Widgets Section (TC-12, TC-13)

| TC-ID | Test Name | File | Description |
|-------|-----------|------|-------------|
| TC-12 | Verify tooltip | `tests/widgets/toolTips.spec.ts` | Hover and verify tooltip display |
| TC-13 | Select date from picker | `tests/widgets/datePicker.spec.ts` | Select different dates and verify selection |

#### 5. Interactions Section (TC-14)

| TC-ID | Test Name | File | Description |
|-------|-----------|------|-------------|
| TC-14 | Drag and drop element | `tests/interactions/dragAndDrop.spec.ts` | Drag element to target and verify |

#### 6. End-to-End (TC-15)

| TC-ID | Test Name | File | Description |
|-------|-----------|------|-------------|
| TC-15 | Complete user journey | `tests/e2e/demoqa.e2e.spec.ts` | Navigate through multiple sections and verify functionality |

---

## Running Tests

### 1. Run All Tests

```bash
# Run all tests with default configuration (chromium)
npx playwright test

# Run with line reporter (more concise output)
npx playwright test --reporter=line

# Run with HTML report
npx playwright test --reporter=html
```

### 2. Run Tests by Project (Browser)

```bash
# Run only on Chromium
npx playwright test --project=chromium

# Run only on Firefox
npx playwright test --project=firefox

# Run only on WebKit
npx playwright test --project=webkit

# Run on all configured browsers
npx playwright test --project=chromium --project=firefox --project=webkit
```

### 3. Run Specific Test Files

```bash
# Run a specific test file
npx playwright test tests/elements/textBox.spec.ts

# Run tests in a specific directory
npx playwright test tests/elements/

# Run tests matching a pattern
npx playwright test --grep "Text Box"
```

### 4. Run in Debug Mode

```bash
# Debug mode with inspector
npx playwright test --debug

# Run tests with headed browser (see browser window)
npx playwright test --headed

# Run tests with headed browser and debug
npx playwright test --headed --debug
```

### 5. Run with Different Reporters

```bash
# List reporter (default)
npx playwright test --reporter=list

# Line reporter (more concise)
npx playwright test --reporter=line

# HTML report
npx playwright test --reporter=html

# View HTML report
npx playwright show-report

# JSON report
npx playwright test --reporter=json

# JUnit XML report (for CI/CD)
npx playwright test --reporter=junit
```

### 6. Run with Watch Mode

```bash
# Run tests in watch mode (re-run on file changes)
npx playwright test --watch
```

### 7. Run Single Test

```bash
# Run a single test by name
npx playwright test -g "Submit text box with valid data"

# Run tests containing multiple keywords
npx playwright test --grep "Web Tables.*search"
```

---

## Debugging Tests

### 1. Using Playwright Inspector

```bash
# Launch Playwright Inspector with step-by-step debugging
npx playwright test --debug

# In Inspector:
# - Step over (F10)
# - Step into (F11)
# - Step out (Shift+F11)
# - Continue (F8)
# - View console
# - Inspect selectors
```

### 2. Using Headed Browser

```bash
# Run tests with visible browser window
npx playwright test --headed

# Useful for:
# - Seeing what's happening during test execution
# - Manually testing selectors
# - Debugging UI interactions
```

### 3. Using Trace Viewer

```bash
# Record trace during test run
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip

# In Trace Viewer:
# - Watch timeline of test execution
# - See DOM state at each step
# - Inspect network requests
# - View console logs
```

### 4. Taking Screenshots

Add screenshots to your tests:

```typescript
test('Example with screenshot', async ({ page }) => {
  await page.goto('https://demoqa.com');
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Take screenshot of specific element
  await page.locator('#output').screenshot({ path: 'element.png' });
});
```

### 5. Using console.log and console.error

```typescript
test('Example with logging', async ({ page }) => {
  console.log('Starting test');
  
  await page.goto('https://demoqa.com');
  console.log('Page loaded');
  
  const title = await page.title();
  console.log('Page title:', title);
});
```

### 6. Slow Motion Testing

```bash
# Run tests in slow motion (useful for observation)
npx playwright test --headed --reporter=line

# Add to playwright.config.ts:
use: {
  slowMo: 1000, // 1 second delay between actions
}
```

---

## Best Practices

### 1. Use Playwright Waits, Not Hard-coded Delays

❌ **Bad Practice:**
```typescript
// NEVER use hard-coded waits
await page.waitForTimeout(1000);
```

✅ **Good Practice:**
```typescript
// Use Playwright's built-in waits
await expect(page.locator('#element')).toBeVisible();
await page.locator('#element').waitFor();
await page.waitForLoadState('networkidle');
```

### 2. Use Proper Selectors

❌ **Bad Practice:**
```typescript
// Don't use brittle selectors
const button = page.locator('button:nth-child(3)');
```

✅ **Good Practice:**
```typescript
// Use role-based selectors
const button = page.locator('button:has-text("Submit")');

// Use test IDs
const button = page.locator('[data-testid="submit-button"]');

// Use specific classes/IDs
const button = page.locator('#submitButton');
```

### 3. Use Fixtures for Setup

✅ **Good Practice:**
```typescript
test.beforeEach(async ({ page }) => {
  const page = new HomePage(page);
  await page.navigate();
});
```

### 4. Keep Tests Independent

✅ **Good Practice:**
```typescript
// Each test should be able to run independently
test('Test A', async ({ page }) => {
  await setup(page);
  // Test logic
});

test('Test B', async ({ page }) => {
  await setup(page);
  // Test logic (doesn't depend on Test A)
});
```

### 5. Use Page Objects Consistently

✅ **Good Practice:**
```typescript
// Always use page objects, not raw Playwright
const textBoxPage = new TextBoxPage(page);
await textBoxPage.fillForm('John', 'john@example.com');
```

### 6. Write Descriptive Test Names

✅ **Good Practice:**
```typescript
// Clear, descriptive test names
test('Submit form with valid email and verify confirmation message', async () => {
  // ...
});

// Not:
test('form test', async () => {
  // ...
});
```

### 7. Group Related Tests

✅ **Good Practice:**
```typescript
test.describe('Text Box Tests', () => {
  test.describe('Valid Input', () => {
    test('Submit with valid data', async () => { });
    test('Submit with email special characters', async () => { });
  });

  test.describe('Invalid Input', () => {
    test('Reject invalid email', async () => { });
  });
});
```

### 8. Use Test Data Files

✅ **Good Practice:**
```typescript
// test-data/users.json
{
  "validUser": {
    "firstName": "John",
    "email": "john@example.com"
  }
}

// In test:
import userData from '../../test-data/users.json';

test('Submit form', async ({ page }) => {
  await textBoxPage.fillForm(userData.validUser.firstName, userData.validUser.email);
});
```

---

## Troubleshooting

### Issue 1: Tests Timing Out

**Symptoms:** Tests fail with "Test timeout exceeded" error

**Solutions:**
```bash
# Increase timeout in playwright.config.ts
use: {
  timeout: 60000, // 60 seconds instead of 30
}

# Or per test
test('Long running test', async ({ page }) => {
  // ...
}, { timeout: 60000 });

# Use headed browser to see what's happening
npx playwright test --headed --reporter=line
```

### Issue 2: Selector Not Found

**Symptoms:** Error "Locator did not resolve to any elements"

**Solutions:**
```typescript
// Wait for element to be visible
await expect(page.locator('#element')).toBeVisible();

// Use getByRole (more reliable)
const button = page.getByRole('button', { name: 'Submit' });

// Inspect the page to find correct selector
npx playwright test --debug

// Use developer tools in headed mode to inspect elements
npx playwright test --headed
```

### Issue 3: Element Not Clickable

**Symptoms:** Error "Element intercepts pointer events"

**Solutions:**
```typescript
// Scroll element into view
await page.locator('#element').scrollIntoViewIfNeeded();

// Use force click (last resort)
await page.locator('#element').click({ force: true });

// Try clicking with force in debug mode first
npx playwright test --headed
```

### Issue 4: Flaky Tests

**Symptoms:** Tests pass sometimes, fail other times

**Solutions:**
```typescript
// Add explicit waits
await expect(page.locator('#element')).toBeVisible();

// Wait for network idle before assertions
await page.waitForLoadState('networkidle');

// Use specific timeout for expects
await expect(page.locator('#element')).toContainText('text', { timeout: 5000 });
```

### Issue 5: TypeScript Compilation Errors

**Symptoms:** Error "TS error in path/to/file.ts"

**Solutions:**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Generate tsconfig.json
npx tsc --init

# Check for missing types
npm install --save-dev @types/node

# Ensure all imports are correct
# pages/ imports: ../../pages/ (two levels up)
# test imports: ../../pages/ (two levels up)
```

### Issue 6: Browser Download Issues

**Symptoms:** Error "Failed to download browser"

**Solutions:**
```bash
# Re-install browsers
npx playwright install

# Clear browser cache and reinstall
npx playwright install --with-deps

# On macOS, you may need to install dependencies
brew install libzip libxss1

# On Linux, install dependencies
sudo apt-get install libzip4 libxss1
```

### Issue 7: Port Already in Use

**Symptoms:** Error "EADDRINUSE: address already in use :::PORT"

**Solutions:**
```bash
# Kill process using the port (Windows)
netstat -ano | findstr :PORT
taskkill /PID PID_NUMBER /F

# Kill process using the port (macOS/Linux)
lsof -ti:PORT | xargs kill -9
```

---

## Complete Test Run Checklist

### Before Running Tests

- [ ] Node.js and npm are installed
- [ ] Project is cloned from GitHub
- [ ] `npm install` completed successfully
- [ ] `npx playwright install` completed
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] All selectors are updated for current website version

### Running Tests

```bash
# Step 1: Verify TypeScript
npx tsc --noEmit

# Step 2: Run all tests
npx playwright test --project=chromium --reporter=line

# Step 3: Check results
# Expected: 32 passed

# Step 4: View detailed report (if needed)
npx playwright show-report
```

### After Tests Complete

- [ ] All tests passed (32 passed)
- [ ] No TypeScript errors
- [ ] Review any failed tests
- [ ] Check test-results/ directory for artifacts
- [ ] View HTML report if available

---

## Quick Reference Commands

```bash
# Installation
npm install
npx playwright install

# Verification
npx tsc --noEmit

# Running Tests
npx playwright test                              # All tests
npx playwright test --project=chromium           # Chromium only
npx playwright test tests/elements/              # Specific directory
npx playwright test --grep "Text Box"           # Pattern matching
npx playwright test --headed                     # With visible browser
npx playwright test --debug                      # With debugger

# Reporting
npx playwright show-report                       # View HTML report
npx playwright test --reporter=html              # Generate HTML report
npx playwright test --reporter=json > report.json # JSON report

# Debugging
npx playwright test --headed --reporter=line    # Visible + concise output
npx playwright test --trace on                  # Record trace
npx playwright show-trace trace.zip             # View trace

# Git Operations
git status                                       # Check status
git add .                                        # Stage changes
git commit -m "message"                          # Commit
git push origin main                             # Push to GitHub
```

---

## Contact & Support

For issues or questions:
1. Check this guide's Troubleshooting section
2. Review test output and error messages
3. Use `--debug` mode to inspect issues
4. Check Playwright documentation: https://playwright.dev
5. Report issues on GitHub: https://github.com/DSI-QA-AUTOMATION/RUHUL-PLAYWRIGHT-731

---

## References

- **Playwright Documentation:** https://playwright.dev
- **Playwright Best Practices:** https://playwright.dev/docs/best-practices
- **Page Object Model:** https://playwright.dev/docs/pom
- **Debugging Guide:** https://playwright.dev/docs/debug
- **DemoQA Website:** https://demoqa.com

---

**Last Updated:** March 3, 2026  
**Framework Version:** v1.0  
**Test Status:** ✅ 32/32 tests passing
