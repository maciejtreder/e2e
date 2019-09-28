import { element, ElementFinder, by } from 'protractor';

export class MenuComponent {
    private container : ElementFinder;

    constructor() {
        this.container = element(by.tagName('menu'));
    }

    public getContainer(): ElementFinder {
        return this.container;
    }

    public getItemByText(text: string): ElementFinder {
        return this.container.element(by.xpath(`//li[text()="${text}"]`));
    }
}