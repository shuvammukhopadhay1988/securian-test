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
    get socialSecurityYes(): ChainablePromiseElement {
        return $('#yes-social-benefits');
    }
    get socialSecurityNo(): ChainablePromiseElement {
        return $('#no-social-benefits');
    }
    get maritalStatusYes(): ChainablePromiseElement {
        return $('#married');
    }
    get socialSecurityOverride(): ChainablePromiseElement {
        return $('#social-security-override');
    }

    // Adjust Defaults
    get adjustDefaultsBtn() {
        return $('//a[@role="button" and contains(text(),"Adjust default values")]');
    }

    // Additional Fields
    get additionalIncome() { return $('#additional-income'); }
    get years() { return $('#retirement-duration'); }
    get inflationYes() { return $('#include-inflation'); }
    get percentIncome() { return $('#retirement-annual-income'); }
    get preReturn() { return $('#pre-retirement-roi'); }
    get postReturn() { return $('#post-retirement-return'); }

    // Adjust Defaults
    get saveChangesButton() {
        return $('//button[@type="button" and contains(text(),"Save changes")]');
    }
    // Actions
    get calculateBtn() {
        return $('//button[@type="button" and contains(text(),"Calculate")]');
    }

    async open() {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    }

    async fillBaseForm(data: any) {
        await this.currentAge.setValue(data.currentAge);
        await this.retirementAge.setValue(data.retirementAge);
        await this.currentIncome.setValue(data.currentIncome);
        await this.spouseIncome.setValue(data.spouseIncome);
        await this.savings.setValue(data.savings);
        await this.contribution.setValue(data.contribution);
        await this.increase.setValue(data.increase);
    }

    // Method updated with conditional waits
    async selectSocialSecurity(option: string) {
        const socialvalue = option.toLowerCase();

        if (socialvalue === 'yes') {
            await this.socialSecurityYes.waitForClickable();
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
            await this.socialSecurityNo.waitForClickable();
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
        await this.maritalStatusYes.waitForClickable();
        await this.maritalStatusYes.click();
    }

    // Enter Social Security Override
    async enterSocialSecurityOverride(amount: string) {
        await this.socialSecurityOverride.waitForDisplayed();
        await this.socialSecurityOverride.clearValue();
        await this.socialSecurityOverride.setValue(amount);
    }

    async clickAdjustDefaults() {
        await this.adjustDefaultsBtn.click();
    }

    async fillAdditionalFields(data: any) {
        await this.additionalIncome.setValue(data.additionalIncome);
        await this.years.setValue(data.years);

        if (data.inflation.toLowerCase() === 'yes') {
            await this.inflationYes.click();
        }

        await this.percentIncome.setValue(data.percentIncome);
        await this.preReturn.setValue(data.preReturn);
        await this.postReturn.setValue(data.postReturn);
        await this.saveChangesButton.click();
    }

    async clickCalculate() {
        await this.calculateBtn.click();
    }
}

export default new RetirementPage();