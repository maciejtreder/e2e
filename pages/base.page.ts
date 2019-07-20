import { WebElement, element, by, browser } from 'protractor';

export abstract class BasePage {
    private static title: WebElement = element(by.css('h1'));
    
    public abstract go(): void;
    public abstract isOnPage(): Promise<boolean>;

    public async getTitle() {
        return BasePage.title.getText();
    }
}