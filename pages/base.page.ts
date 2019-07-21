import { element, by, browser, ExpectedConditions, ElementFinder } from 'protractor';

export abstract class BasePage {
    private static title: ElementFinder = element(by.css('h1'));
    private static loader: ElementFinder = element(by.css('img'));
    
    public abstract go(): void;
    public abstract isOnPage(): Promise<boolean>;

    public async getTitle() {
        return BasePage.title.getText();
    }

    public waitForHttp(): void {
        browser.wait(ExpectedConditions.invisibilityOf(BasePage.loader), 2000);
    }
}