import { WebElement, element, by, browser } from 'protractor';
import { BasePage } from './base.page';

export class DonePage extends BasePage {
    
    public go() {
        browser.get(`http://maciejtreder.github.io/e2e/static/done`);
    }

    public async isOnPage(): Promise<boolean> {
        return await this.getTitle() === 'What you have done so far:';
    }
}