import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionsHomeComponent } from './options-home/options-home.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
        {
          path: 'tasks',
          loadChildren:()=>import("../tasks/tasks.module").then(m=>m.TasksModule)
        },
        {
          path: 'videos', 
          loadChildren:()=>import("../videos/videos.module").then(m=>m.VideosModule)
        },
        {
          path: 'patients', 
          loadChildren:()=>import("../patients/patients.module").then(m=>m.PatientsModule)
        },
        {
          path: 'help', 
          loadChildren:()=>import("../help/help.module").then(m=>m.HelpModule)
        },
        {
          path: 'profile', 
          loadChildren:()=>import("../profile/profile.module").then(m=>m.ProfileModule)
        },
        {
          path: 'options-home', component: OptionsHomeComponent
        },
      ]
      },
    ] 
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }