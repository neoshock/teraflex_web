import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialVideosComponent } from './tutorial-videos/tutorial-videos.component';


//Rutas hijas
const routes: Routes = [
  {
    path: 'tutorial-videos', component: TutorialVideosComponent
  },
  {
    path: "",
    redirectTo: "help",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HelpRoutingModule { }