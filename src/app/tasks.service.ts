import { Injectable } from '@angular/core';
import { Task, ITask } from './model/task';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];
  private tasks$: Subject<Task[]> = new BehaviorSubject<Task[]>([]);

  public addTask(task: ITask): void {
    this.tasks.push(new Task(task.name));
    this.tasks$.next(this.tasks);
  }

  public finishTask(task: ITask): void {
    (<Task> task).status = 'done';
    this.tasks$.next(this.tasks);
  }
  
  public getTodo(): Observable<ITask[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === 'todo')));
  }

  public getDone(): Observable<ITask[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === 'done')));
  }

}
