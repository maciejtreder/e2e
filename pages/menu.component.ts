import { element, Locator, ElementFinder, by } from 'protractor';

export class MenuComponent {
    private container : ElementFinder;
    
    constructor(locator: Locator) {
        this.container = element(locator);
    }

    public getContainer(): ElementFinder {
        return this.container;
    }

    public getItemByText(text: string): ElementFinder {
        return this.container.element(by.xpath(`//li[text()="${text}"]`));
    }
}