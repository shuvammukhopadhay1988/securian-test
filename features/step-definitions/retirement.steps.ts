import { Given, When, Then } from '@wdio/cucumber-framework';
import RetirementPage from '../pageobjects/retirement.page.ts';
import { writeLog } from '../utils/logger';

Given('the user is on the retirement calculator page', async () => {
    await RetirementPage.open();
    writeLog('Opened retirement calculator page');
});

When('the user enters retirement details:', async (table) => {
                                                                                                                                                        await RetirementPage.closeCookiePopup();
    const data = table.hashes()[0];
    await RetirementPage.fillBaseForm(data);
    writeLog(`Entered retirement details`);
});

When('the user selects social security income as {string} and override amount {string}', async (option: string, amount: string) => {
    await RetirementPage.selectSocialSecurity(option, amount);
    writeLog(`Selected social security income option: ${option}`);
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

Then('the user clicks calculate final amount', async () => {
    await RetirementPage.clickCalculate();
    writeLog('Clicked calculate final amount');
    writeLog(await (await RetirementPage.getResults()).getText());
});
