import { ElementFinder, element, by, browser, ExpectedConditions } from 'protractor';
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
        return element(by.xpath(`//li[contains(text(), '${name}')]`));
    }

    public getErrorInfo(): ElementFinder {
        return element(by.css('.error'));
    }

    public async getMarkAsDoneButton(name: string): Promise<ElementFinder> {
        const liObject = await this.getTaskByName(name);
        return liObject.element(by.css('span'));
    }

}