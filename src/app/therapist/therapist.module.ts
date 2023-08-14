import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutinModule } from './modules/auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './modules/home/home-routing.module';
import { TasksRoutingModule } from './modules/tasks/tasks-routing.module';
import { PatientsRoutingModule } from './modules/patients/patients-routing.module';
import { HelpRoutingModule } from './modules/help/help-routing.module';
import { ProfileModule } from './modules/profile/profile.module';
/* import { SharedComponentsModule } from './shared-components/shared-components.module'; */

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutinModule,
    HomeRoutingModule,
    TasksRoutingModule,
    PatientsRoutingModule,
    HelpRoutingModule,
    ProfileModule
  ]
})
export class TherapistModule { }
