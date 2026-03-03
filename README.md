# RUHUL-PLAYWRIGHT-731

## 🧑‍🏫 Assignment Rules

✔ Follow the provided folder structure  
✔ Use **Page Object Model (POM)**  
✔ **Do NOT** use `page.waitForTimeout()`  
✔ Use proper and meaningful assertions  
✔ Use clear and meaningful test names

❌ Hard-coded waits are not allowed  
❌ Poor locator strategies should be avoided

---

## 🧪 Test Folder Structure

<pre>
demoqa-playwright-assignment/
├── tests/
│   ├── e2e/
│   │   └── demoqa.e2e.spec.ts
│   ├── elements/
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
│   └── interactions/
│       └── dragAndDrop.spec.ts
│
├── pages/
│   ├── base/
│   │   └── BasePage.ts
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
├── test-data/
│   ├── users.json
│   └── formData.json
│
├── utils/
│   ├── testUtils.ts
│   └── waitHelpers.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── reports/
│   ├── html-report/
│   └── screenshots/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
</pre>



## 📝 Evaluation Rubric (Optional)

The assignment will be evaluated based on the following criteria:

| Area            | Marks |
|-----------------|-------|
| Test coverage   | 30    |
| Code quality    | 25    |
| Assertions      | 20    |
| POM usage       | 15    |
| Reporting & CI  | 10    |
| **Total**       | **100** |
