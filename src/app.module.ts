import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TaskService } from './task.service';
import { TaskSchema } from './model/task.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://maciejtreder:Abc123!@cluster0-1gerr.mongodb.net/e2e?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}])
  ],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule {}
