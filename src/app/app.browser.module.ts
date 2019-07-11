import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DoneListComponent } from './done-list/done-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
