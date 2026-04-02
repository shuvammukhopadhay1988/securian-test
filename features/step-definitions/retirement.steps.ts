import { Given, When, Then } from '@wdio/cucumber-framework';
import RetirementPage from '../pageobjects/retirement.page.ts';
import { writeLog } from '../utils/logger';

Given('the user is on the retirement calculator page', async () => {
    await RetirementPage.open();
    writeLog('Opened retirement calculator page');
});

When('the user enters retirement details:', async (table) => {
    const data = table.hashes()[0];
    await RetirementPage.fillBaseForm(data);
    writeLog(`Entered retirement details`);
});

When('the user selects social security income as {string}', async (option: string) => {
    await RetirementPage.selectSocialSecurity(option);
    writeLog(`Selected social security income option: ${option}`);
});

Then('additional social security fields should be displayed', async () => {
    await RetirementPage.selectMaritalStatus(); 
    writeLog('Selected marital status as married');
});

When('the user enters social security override as {string}', async (value: string) => {
    await RetirementPage.enterSocialSecurityOverride(value);
    writeLog(`Entered social security override: ${value}`);
});

When('the user clicks on adjust default values', async () => {
    await RetirementPage.clickAdjustDefaults();
    writeLog('Clicked on adjust default values');
});

When('the user enters additional adjustment details:', async (table) => {
    const data = table.hashes()[0];
    await RetirementPage.fillAdditionalFields(data);
    writeLog('Entered additional adjustment details');
});

When('the user clicks calculate final amount', async () => {
    await RetirementPage.clickCalculate();
    writeLog('Clicked calculate final amount');
    writeLog(await RetirementPage.results.getText());
    await browser.saveScreenshot('../../allure-results/screenshots/final-results.png');
});
