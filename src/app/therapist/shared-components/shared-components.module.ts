import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoLoginComponent } from './info-login/info-login.component';
import { LastLoginsComponent } from './last-logins/last-logins.component';
import { TasksToReviewComponent } from './tasks-to-review/tasks-to-review.component';
import { SliderVideosComponent } from './slider-videos/slider-videos.component';
import { ChatIAComponent } from './chat-ia/chat-ia.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchRegistersPipe } from './pipes/search-registers.pipe';
import { ChartUiComponentComponent } from './chart-ui-component/chart-ui-component.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { BadgesInfoComponentComponent } from './badges-info-component/badges-info-component.component';

@NgModule({
  declarations: [
    InfoLoginComponent,
    SliderVideosComponent,
    LastLoginsComponent,
    TasksToReviewComponent,
    ChatIAComponent,
    SpinnerComponent,
    SearchRegistersPipe,
    ChartUiComponentComponent,
    BadgesInfoComponentComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxChartsModule,
    NgChartsModule
  ],
  exports:[
    InfoLoginComponent,
    LastLoginsComponent,
    TasksToReviewComponent,
    SliderVideosComponent,
    ChatIAComponent,
    SpinnerComponent,
    SearchRegistersPipe,
    ChartUiComponentComponent,
  ]
})
export class SharedComponentsModule { }
