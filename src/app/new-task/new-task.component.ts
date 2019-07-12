import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {

  public newTask = new FormGroup({
    name: new FormControl('', Validators.required)
  });


  public disable$ = this.loaderService.getOnGoingRequests();

  constructor(private tasksService: TasksService, private loaderService: LoaderService) { }

  public save(): void {
    this.tasksService.addTask(this.newTask.value).subscribe(() => {
      this.newTask.reset();
    });
  }
}
