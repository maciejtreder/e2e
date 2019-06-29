import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';
import { ITask } from '../model/task';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['../todo-list/todo-list.component.scss']
})
export class DoneListComponent {

  constructor(private tasksService: TasksService) { }

  public tasks$: Observable<ITask[]> = this.tasksService.getDone();
}
