import { TodoPage } from '../pages/todo.page';

describe('My First spec', () => {
    beforeAll( async () => {
        await TodoPage.go();
    });

    it('Should be able to navigate to application', async () => {
        expect(await TodoPage.getTitle()).toBe('Todo');
    });
});