import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {

  public newTask = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private tasksService: TasksService) { }

  public save(): void {
    this.tasksService.addTask(this.newTask.value);
    this.newTask.reset();
  }

}
