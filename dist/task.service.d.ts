import { Model } from 'mongoose';
import { Task } from './model/task';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    create(newTask: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    update(updatedTask: Task): Promise<Task>;
    delete(toDelete: String): Promise<Task>;
    private getById;
}
