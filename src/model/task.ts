import { IsNotEmpty } from 'class-validator';

export class Task {
    @IsNotEmpty()
    public status: 'done' | 'todo' = 'todo';

    public _id: string;

    @IsNotEmpty()
    public name: string;

}