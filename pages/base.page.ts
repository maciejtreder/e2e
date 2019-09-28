import { element, by, ElementFinder } from 'protractor';

export abstract class BasePage {
    private title: ElementFinder = element(by.css('h1'));

    public abstract go(): void;
    public abstract isOnPage(): Promise<boolean>;

    public getTitle(): ElementFinder {
        return this.title;
    }
}