import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks-to-review',
  templateUrl: './tasks-to-review.component.html',
  styleUrls: ['./tasks-to-review.component.css']
})
export class TasksToReviewComponent {

  /*Icons to use*/
  iconToReview = iconos.faCalendarCheck;
}
