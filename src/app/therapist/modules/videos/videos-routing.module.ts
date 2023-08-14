import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMyVideosComponent } from './list-my-videos/list-my-videos.component';
import { UploadVideoFormComponent } from './upload-video-form/upload-video-form.component';
import { EditMyVideosComponent } from './edit-my-videos/edit-my-videos.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'list-videos', component: ListMyVideosComponent
  },
  {
    path: 'upload-video', component: UploadVideoFormComponent
  },
  {
    path: 'edit-video', component: EditMyVideosComponent
  },
  {
    path: "",
    redirectTo: "upload-video",
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
export class VideosRoutingModule { }