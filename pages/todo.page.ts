import { WebElement, element, by, browser } from 'protractor';

export class TodoPage {
    private static title: WebElement = element(by.css('h1'));
    private static newTaskInput: WebElement = element(by.tagName('input'));

    public static async go() {
        await browser.get(`http://maciejtreder.github.io/e2e/static/todos`);
    }

    public static async getTitle() {
        return TodoPage.title.getText();
    }
}