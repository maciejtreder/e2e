import { TodoPage } from "../pages/todo.page";
import { TaskHttpService } from "../services/task.http.service";

describe('Todo Page', () => {
    const todoPage = new TodoPage();
    const tasksHttpService = new TaskHttpService();

    let task;

    beforeEach(async () => {
        task = await tasksHttpService.createTask({name: 'mtreder' + new Date().getTime()});
        todoPage.go()
    });

    it('Should contain all elements', async () => {
        expect(await todoPage.getNewTaskInput().isPresent()).toEqual(true);
        expect(await todoPage.getNewTaskSubmitButton().isPresent()).toEqual(true);
        expect(await todoPage.getNewTaskError().isPresent()).toEqual(false);
    });

    it('Should not be able to submit empty form', async () => {
        await todoPage.getNewTaskInput().click();
        await todoPage.getTitle().click();
        expect(await todoPage.getNewTaskSubmitButton().isEnabled()).toEqual(false);
        expect(await todoPage.getErrorInfo().isPresent()).toEqual(true);
    });

    it('Should be able to add task', async () => {
        const newTaskName = `mtreder${new Date().getTime()}`;
        await todoPage.getNewTaskInput().sendKeys(newTaskName);
        await todoPage.getNewTaskSubmitButton().click();

        expect(await todoPage.getTaskByName(newTaskName).isDisplayed()).toEqual(true);
        await tasksHttpService.deleteTaskByName(newTaskName);
    });

    it('Should display task on todo page', async () => {
        expect(await todoPage.getTaskByName(task.name).isDisplayed()).toEqual(true);
    });

    it('Should be able to mark task as done', async () => {
        const taskEntry = todoPage.getTaskByName(task.name);
        (await todoPage.getMarkAsDoneButton(task.name)).click();
        expect(await taskEntry.isPresent()).toEqual(false);
    });

    afterEach( async () => {
        await tasksHttpService.deleteTask(task._id);
    });    
});