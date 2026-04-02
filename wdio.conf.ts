import fs from 'fs';
import path from 'path';

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    baseUrl: 'https://www.securian.com/',
    specs: ['./features/**/*.feature'],

    maxInstances: 5,

    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor'
                ]
            }
        }
    ],

    logLevel: 'info',
    bail: 0,

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'cucumber',

    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results' }]
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        timeout: 60000,
        failFast: false,
        ignoreUndefinedDefinitions: false
    },

    /**
     * Clean Allure results before execution
     */
    onPrepare: () => {
        const dirs = ['allure-results'];

        dirs.forEach((dir) => {
            const fullPath = path.resolve(dir);
            if (fs.existsSync(fullPath)) {
                fs.rmSync(fullPath, { recursive: true, force: true });
            }
            fs.mkdirSync(fullPath, { recursive: true });
        });
    },

    afterStep: async function (_test, _scenario, { passed }) {
        if (!passed) {
            const fileName = `./allure-results/logs/error-${Date.now()}.png`;

            await browser.saveScreenshot(fileName);
        }
    }
};