import { Injectable } from '@angular/core';
import { Task, ITask } from './model/task';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private API_ENDPOINT: string = 'https://e2e-workshop-backend.herokuapp.com';

  private tasks$: Subject<Task[]> = new BehaviorSubject([]);

  constructor(private http:HttpClient) {
    console.log('constructor');
    this.retrieveTasks().subscribe(() => {console.log('subscribe in constructor')});
  }

  public addTask(task: ITask): Observable<void> {
    return this.http.post<Task>(`${this.API_ENDPOINT}/tasks`, new Task(task.name))
    .pipe(flatMap(() => this.retrieveTasks()));
  }

  public finishTask(task: ITask): Observable<void> {
    (<Task> task).status = 'done';
    return this.http.put<Task>(`${this.API_ENDPOINT}/tasks/${(<Task> task)._id}`, task)
    .pipe(flatMap(() => this.retrieveTasks()));
  }
  
  public getTodo(): Observable<ITask[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === 'todo')));
  }

  public getDone(): Observable<ITask[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(task => task.status === 'done')));
  }

  private retrieveTasks(): Observable<void> {
    console.log('retrieve tasks');
    return this.http.get<Task[]>(`${this.API_ENDPOINT}/tasks`).pipe(
      tap(tasks => {
        console.log('tap');
        this.tasks$.next(tasks)
      }),
      flatMap(() => new Observable<void>(observer => {
        observer.next();
        observer.complete();
      }))
    );
  }

}
