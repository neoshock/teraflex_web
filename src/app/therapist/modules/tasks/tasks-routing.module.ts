import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMyTasksComponent } from './list-my-tasks/list-my-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditMyTasksComponent } from './edit-my-tasks/edit-my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'my-tasks', component: ListMyTasksComponent
  },
  {
    path: 'create-task', component: CreateTaskComponent
  },
  {
    path: 'edit-task', component: EditMyTasksComponent
  },
  {
    path: 'assign-tasks', component: AssignTasksComponent
  },
  {
    path: "",
    redirectTo: "my-tasks",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule { }