import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ViewMyProfileComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ProfileRoutingModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
