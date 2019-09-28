import { RxHR } from '@akanass/rx-http-request';
import { Task } from '../model/task.model';
import { map } from 'rxjs/operators';

export class TaskHttpService {
    private readonly SERVICE_URI: string = 'https://e2e-workshop-backend.herokuapp.com/tasks';

    public deleteTask(id: string): Promise<void> {
        return RxHR.delete(this.SERVICE_URI + `/delete/${id}`).pipe(map(response => {
            return;
        })).toPromise();
    }

    public async deleteTaskByName(name: string): Promise<void> {
        const allTasks: Task[] = await RxHR.get(this.SERVICE_URI, {json: true})
            .pipe(map(response => response.body as Task[])).toPromise();

        const taskId = allTasks.find(subject => subject.name === name)._id;
        return this.deleteTask(taskId);
    }

    public createTask(task: Task): Promise<Task> {
        return RxHR.post(this.SERVICE_URI, {
            json: true,
            body: task
        }).pipe(map(response => response.body as Task)).toPromise();
    }
}