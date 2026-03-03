import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

interface CustomFixtures {
  testData: {
    validUser: {
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      gender: string;
    };
  };
}

export const testFixtures = base.extend<CustomFixtures>({
  testData: async ({}, use) => {
    const data = {
      validUser: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        gender: 'Male'
      }
    };
    await use(data);
  }
});

export { Page };
