import { ChainablePromiseElement } from 'webdriverio';

class RetirementPage {

    // Social Security Radio Buttons
    get socialSecurityYes(): ChainablePromiseElement {
        return $('#yes-social-benefits');
    }

    get socialSecurityNo(): ChainablePromiseElement {
        return $('#no-social-benefits');
    }

    // Dependent Fields (NEW / UPDATED)
    get maritalStatusYes(): ChainablePromiseElement {
        return $('#marital-status-yes');
    }

    get maritalStatusNo(): ChainablePromiseElement {
        return $('#marital-status-no');
    }

    get socialSecurityOverride(): ChainablePromiseElement {
        return $('#social-security-override');
    }

    import { ChainablePromiseElement } from 'webdriverio';

class RetirementPage {

    // Social Security
    get socialSecurityYes(): ChainablePromiseElement {
        return $('#yes-social-benefits');
    }

    get socialSecurityNo(): ChainablePromiseElement {
        return $('#no-social-benefits');
    }

    // Marital Status (UPDATED for Married selection)
    get maritalStatusMarried(): ChainablePromiseElement {
        return $('#married'); // <-- update if actual locator differs
    }

    get maritalStatusSingle(): ChainablePromiseElement {
        return $('#single');
    }

    // Social Security Override
    get socialSecurityOverride(): ChainablePromiseElement {
        return $('#social-security-override');
    }

    // Select Social Security + wait for dependent fields
    async selectSocialSecurity(option: string) {
        const normalized = option.toLowerCase();

        if (normalized === 'yes') {
            await this.socialSecurityYes.waitForClickable();
            await this.socialSecurityYes.click();

            // Wait for dependent fields
            await this.maritalStatusMarried.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Marital Status field not displayed'
            });

            await this.socialSecurityOverride.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Social Security Override field not displayed'
            });

        } else if (normalized === 'no') {
            await this.socialSecurityNo.waitForClickable();
            await this.socialSecurityNo.click();
        } else {
            throw new Error(`Invalid option: ${option}`);
        }
    }

    // ✅ NEW: Select Marital Status = Married
    async selectMaritalStatus(status: string) {
        if (status.toLowerCase() === 'married') {
            await this.maritalStatusMarried.waitForClickable();
            await this.maritalStatusMarried.click();
        } else {
            await this.maritalStatusSingle.waitForClickable();
            await this.maritalStatusSingle.click();
        }
    }

    // ✅ NEW: Enter Social Security Override
    async enterSocialSecurityOverride(amount: string) {
        await this.socialSecurityOverride.waitForDisplayed();
        await this.socialSecurityOverride.clearValue();
        await this.socialSecurityOverride.setValue(amount);
    }
}

export default new RetirementPage();
}

export default new RetirementPage();