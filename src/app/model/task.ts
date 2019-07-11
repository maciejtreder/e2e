export interface ITask {
    name: string;
}

export class Task implements ITask {
    public _id: string;
    public status: 'done' | 'todo' = 'todo';

    constructor(public name: string) {}

}