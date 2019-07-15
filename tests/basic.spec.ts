import { browser, by, element } from 'protractor';

describe('Basic tests', () => {
    it('Should be able to navigate to the application', async () => {
        browser.get('https://maciejtreder.github.io/e2e/static');
        expect(await element(by.tagName('menu')).isPresent()).toBeTruthy();
    });
});