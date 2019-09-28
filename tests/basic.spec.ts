import { browser } from 'protractor';
import { MenuComponent } from '../pages/menu.component';
import { TodoPage } from '../pages/todo.page';
import { DonePage } from '../pages/done.page';

describe('Basic tests', () => {

    const menu: MenuComponent = new MenuComponent();
    const todoPage: TodoPage = new TodoPage();
    const donePage: DonePage = new DonePage();

    beforeAll(() => {
        browser.get('https://maciejtreder.github.io/e2e/static');
    });

    it('Should be able to navigate to the application', async () => {
        expect(await menu.getContainer().isPresent()).toBeTruthy();
    });

    it('Should be able to navigate within the application', async () => {
        menu.getItemByText("Done").click();
        expect(await donePage.isOnPage()).toBeTruthy();

        menu.getItemByText("Todo list").click();
        expect(await todoPage.isOnPage()).toBeTruthy();
    });
});