export interface ITask {
    name: string;
}

export class Task implements ITask {
    public status: 'done' | 'todo' = 'todo';
    public id: number;
    private static previousId: number = 0;

    constructor(public name: string) {
        this.id = ++Task.previousId;
    }

}