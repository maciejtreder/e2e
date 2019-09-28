import { browser } from 'protractor';
import { BasePage } from './base.page';

export class DonePage extends BasePage {
        public go() {
                browser.get(`http://maciejtreder.github.io/e2e/static/done`);
        }

        public async isOnPage(): Promise<boolean> {
                const title = await this.getTitle().getText();
                return title === "What you have done so far:"
        }
}