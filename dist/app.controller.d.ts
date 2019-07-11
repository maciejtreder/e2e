import { Task } from './model/task';
import { TaskService } from './task.service';
export declare class AppController {
    private taskService;
    constructor(taskService: TaskService);
    addTask(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    editTask(task: Task, params: any): Promise<Task>;
    removeTask(params: any): Promise<Task>;
}
