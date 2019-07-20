import { ElementFinder, element, by, browser } from 'protractor';
import { BasePage } from './base.page';

export class TodoPage extends BasePage {
    public go() {
        browser.get(`http://maciejtreder.github.io/e2e/static/todos`);
    }

    public async isOnPage(): Promise<boolean> {
        return await this.getTitle() === 'Todo';
    }

    public getNewTaskInput(): ElementFinder {
        return element(by.tagName('input'));
    }

    public getNewTaskSubmitButton(): ElementFinder {
        return element(by.xpath('//button[text()="Save"]'));
    }

    public getNewTaskError(): ElementFinder {
        return element(by.css('span.error'));
    }

    public getTaskByName(name: string): ElementFinder {
        return element(by.xpath(`//li[text()="${name}"]`));
    }

}