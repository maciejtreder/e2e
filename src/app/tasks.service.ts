import { Injectable } from '@angular/core';
import { Task, ITask } from './model/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private API_ENDPOINT: string = 'https://e2e-workshop-backend.herokuapp.com';

  constructor(private http:HttpClient) {}

  public addTask(task: ITask): Observable<ITask> {
    return this.http.post<Task>(`${this.API_ENDPOINT}/tasks`, new Task(task.name));
  }

  public finishTask(task: ITask): Observable<ITask> {
    (<Task> task).status = 'done';
    return this.http.put<Task>(`${this.API_ENDPOINT}/tasks/${(<Task> task)._id}`, task);
  }
  
  public getTodo(): Observable<ITask[]> {
    return this.retrieveTasks().pipe(map(tasks => tasks.filter(task => task.status === 'todo')));
  }

  public getDone(): Observable<ITask[]> {
    return this.retrieveTasks().pipe(map(tasks => tasks.filter(task => task.status === 'done')));
  }

  private retrieveTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_ENDPOINT}/tasks`);
  }

}
