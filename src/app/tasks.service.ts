import { Injectable } from '@angular/core';
import { Task, ITask } from './model/task';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];
  private tasks$: Subject<Task[]> = new ReplaySubject<Task[]>();

  constructor() {
    this.tasks$.subscribe(tasks => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    this.tasks = this.tasks ? this.tasks : [];
    this.tasks$.next(this.tasks);
  }

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
