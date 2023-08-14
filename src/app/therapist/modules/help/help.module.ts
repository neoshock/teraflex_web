import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialVideosComponent } from './tutorial-videos/tutorial-videos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelpRoutingModule } from './help-routing.module';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';

@NgModule({
  declarations: [
    TutorialVideosComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelpRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    TutorialVideosComponent
  ]
})
export class HelpModule { }
