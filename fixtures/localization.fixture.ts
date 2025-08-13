import localizationConfig from "../configs/localization.config";
import { test as base, TestInfo } from '@playwright/test';

type localizationFixture = typeof localizationConfig[keyof typeof localizationConfig];

export const test = base.extend<{ localizationFixture: localizationFixture }>({
    localizationFixture: async ({}, use: (value: localizationFixture) => Promise<void>, testInfo: TestInfo) => {
        const config = localizationConfig[testInfo.project.name];
        if (!config) throw new Error('No config found for project: ${projectName}');
        await use(config);
    },
});

export { expect } from '@playwright/test';