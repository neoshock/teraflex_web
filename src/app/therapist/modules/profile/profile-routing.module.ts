import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';

const routes: Routes = [
  {
    path: 'my-profile', component: ViewMyProfileComponent
  },
  {
    path: "",
    redirectTo: "my-profile",
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
export class ProfileRoutingModule { }