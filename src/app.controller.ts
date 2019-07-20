import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { Task } from './model/task';
import { TaskService } from './task.service';
import { removeAllListeners } from 'cluster';

@Controller('/tasks')
export class AppController {

  constructor(private taskService: TaskService) {}

  @Post()
  addTask(@Body() task: Task): Promise<Task> {
    console.log(task);
    return this.taskService.create(task);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Put(':id')
  editTask(@Body() task: Task, @Param() params): Promise<Task> {
    task._id = params.id; 
    return this.taskService.update(task);
  }

  @Delete(':id')
  removeTask(@Param() params): Promise<Task> {
    return this.taskService.delete(params.id);
  }

  @Delete('deleteAll')
  async removeAllListeners(): Promise<Task[]> {
    const tasks: Task[] = await this.taskService.findAll();
    const promiseArr: Promise<Task>[] = [];
    tasks.forEach(task => {
      promiseArr.push(this.taskService.delete(task._id));
    });
    return Promise.all(promiseArr);
  }
}
