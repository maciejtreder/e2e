import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  constructor(private tasksService: TasksService) { }

  public tasks$: Observable<ITask[]> = this.tasksService.getTodo();

  public done(task: ITask): void {
    this.tasksService.finishTask(task).subscribe();
  }

  public ngOnInit(): void {
    this.tasks$.subscribe(tasks => console.log('in todo', tasks));
  }

}
