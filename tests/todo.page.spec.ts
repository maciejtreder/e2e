import { TodoPage } from "../pages/todo.page";
import { TaskHttpService } from "../services/task.http.service";

describe('Todo Page', () => {
    const todoPage = new TodoPage();
    const todoHttpService = new TaskHttpService();

    beforeEach(() => {
        todoPage.go();
    });

    it('Should contain all elements', async () => {
        expect(await todoPage.getNewTaskInput().isPresent()).toEqual(true);
        expect(await todoPage.getNewTaskSubmitButton().isPresent()).toEqual(true);
        expect(await todoPage.getNewTaskError().isPresent()).toEqual(false);
    });

    fit('Should display task on todo page', async () => {
        const task = await todoHttpService.createTask({name: 'mtreder' + new Date().getTime()});

        expect(await todoPage.getTaskByName(task.name).isDisplayed()).toEqual(true);

        todoHttpService.deleteTask(task.id);
    });
});