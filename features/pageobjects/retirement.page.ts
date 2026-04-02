class RetirementPage {

    // Basic Fields
    get currentAge() { return $('#current-age'); }
    get retirementAge() { return $('#retirement-age'); }
    get currentIncome() { return $('#current-income'); }
    get spouseIncome() { return $('#spouse-income'); }
    get savings() { return $('#current-total-savings'); }
    get contribution() { return $('#current-annual-savings'); }
    get increase() { return $('#savings-increase-rate'); }

    // Social Security
    get socialSecurityYes()  {
        return $('//label[@for="yes-social-benefits" and contains(text(),"Yes")]');
    }
    get socialSecurityNo()  {
        return $('//label[@for="no-social-benefits" and contains(text(),"No")]');
    }
    get maritalStatusYes()  {
        return $('//label[@for="married" and contains(text(),"Married")]');
    }
    get socialSecurityOverride()  {
        return $('#social-security-override');
    }

    // Adjust Defaults
    get adjustDefaultsBtn() {
        return $('//a[@role="button" and contains(text(),"Adjust default values")]');
    }

    // Additional Fields
    get additionalIncome() { return $('#additional-income'); }
    get years() { return $('#retirement-duration'); }
    get inflationYes() { return $('//label[@for="include-inflation" and contains(text(),"Yes")]'); }
    get inflationRate() { return $('#expected-inflation-rate'); }
    get percentIncome() { return $('#retirement-annual-income'); }
    get preReturn() { return $('#pre-retirement-roi'); }
    get postReturn() { return $('#post-retirement-roi'); }

    // Adjust Defaults
    get saveChangesButton() {
        return $('//button[@type="button" and contains(text(),"Save changes")]');
    }
    // Actions
    get calculateBtn() {
        return $('//button[@type="button" and contains(text(),"Calculate")]');
    }

    // get results
    get results() {
        return $('//*[@id="result-message"]');
    }

    async open() {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
        await browser.maximizeWindow();
        console.log('Pausing before filling the form');
        await browser.pause(20000);
    }

    //close cookie popup
    async closeCookiePopup() {
        const cookiePopup = $('#onetrust-group-container');
        if (await cookiePopup.isDisplayed()) {
            const rejectButton = $('//button[contains(text(),"Reject optional cookies")]');
            await rejectButton.click();
        }
    }

    async fillBaseForm(data: any) {
        console.log('Pausing before filling the form');
        await browser.pause(10000);
        console.log('Filling base form with data');
        await this.currentAge.setValue(data.currentAge);
        await this.retirementAge.setValue(data.retirementAge);
        await this.currentIncome.click();
        await browser.keys('ArrowRight');
        await this.currentIncome.addValue(data.currentIncome);
        await this.spouseIncome.click();
        await browser.keys('ArrowRight');
        await this.spouseIncome.addValue(data.spouseIncome);
        await this.savings.click();
        await browser.keys('ArrowRight');
        await this.savings.addValue(data.savings);
        await this.contribution.addValue(data.contribution);
        await this.increase.addValue(data.increase);
    }

    // Method updated with conditional waits
    async selectSocialSecurity(option: string) {
        const socialvalue = option.toLowerCase();

        if (socialvalue === 'yes') {
            //await this.socialSecurityYes.waitForClickable();
            await this.socialSecurityYes.click();

            // Wait for fields to displayed
            await this.maritalStatusYes.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Marital status field did not appear after selecting yes'
            });

            await this.socialSecurityOverride.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Social Security override field did not appear after selecting yes'
            });

        } else if (socialvalue === 'no') {
            //await this.socialSecurityNo.waitForClickable();
            await this.socialSecurityNo.click();

            // Optional: ensure fields are NOT displayed
            await this.maritalStatusYes.waitForDisplayed({ reverse: true });
            await this.socialSecurityOverride.waitForDisplayed({ reverse: true });

        } else {
            //not needed but still kept
            throw new Error(`Invalid option: ${option}. Use "yes" or "no".`);
        }
    }
    // Select Marital Status = Married
    async selectMaritalStatus() {
        //await this.maritalStatusYes.waitForClickable();
        await this.maritalStatusYes.click();
    }

    // Enter Social Security Override
    async enterSocialSecurityOverride(amount: string) {
        await this.socialSecurityOverride.click();
        await browser.keys('ArrowRight');
        await this.socialSecurityOverride.addValue(amount);
    }

    async clickAdjustDefaults() {
        await this.adjustDefaultsBtn.click();
    }

    async fillAdditionalFields(data: any) {
        await this.additionalIncome.click();
        await browser.keys('ArrowRight');
        await this.additionalIncome.addValue(data.additionalIncome);
        await this.years.setValue(data.years);

        if (data.inflation.toLowerCase() === 'yes') {
            await this.inflationYes.click();
        }
        await this.inflationRate.click();
        await this.inflationRate.addValue(data.inflationRate);

        await this.percentIncome.addValue(data.percentIncome);
        await this.preReturn.addValue(data.preReturn);
        await this.postReturn.addValue(data.postReturn);
        await this.saveChangesButton.click();
    }

    async clickCalculate() {
        await this.calculateBtn.click();
    }
}

export default new RetirementPage();