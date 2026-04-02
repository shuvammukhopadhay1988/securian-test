import { Given, When, Then } from '@wdio/cucumber-framework';
import RetirementPage from '../pageobjects/retirement.page.ts';

Given('the user is on the retirement calculator page', async () => {
    await RetirementPage.open();
});

When('the user enters retirement details:', async (table) => {
    const data = table.hashes()[0];
    await RetirementPage.fillBaseForm(data);
});

When('the user selects social security income as {string}', async (option: string) => {
    await RetirementPage.selectSocialSecurity(option);
});

Then('additional social security fields should be displayed', async () => {
    await RetirementPage.selectMaritalStatus(); 
});

When('the user enters social security override as {string}', async (value: string) => {
    await RetirementPage.enterSocialSecurityOverride(value);
});

When('the user clicks on adjust default values', async () => {
    await RetirementPage.clickAdjustDefaults();
});

When('the user enters additional adjustment details:', async (table) => {
    const data = table.hashes()[0];
    await RetirementPage.fillAdditionalFields(data);
});

When('the user clicks calculate final amount', async () => {
    await RetirementPage.clickCalculate();
});
