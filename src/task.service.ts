import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './model/task';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

    async create(newTask: Task): Promise<Task> {
        const task = new this.taskModel(newTask);
        return await task.save();
    }

    async findAll(): Promise<Task[]> {
        return await this.taskModel.find().exec();
    }

    async update(updatedTask: Task): Promise<Task> {
        const toUpdate = await this.getById(updatedTask._id);
        toUpdate.name = updatedTask.name;
        toUpdate.status = updatedTask.status;
        return await toUpdate.save();
    }

    async delete(toDelete: String): Promise<Task> {
        const task = await this.getById(toDelete);
        return await task.remove();
    }

    private async getById(id: String): Promise<Model<Task>> {
        const model = (await this.taskModel.find({_id : id}).exec())[0];
        if (!model) {
            throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);
        }
        return model;
    }
}