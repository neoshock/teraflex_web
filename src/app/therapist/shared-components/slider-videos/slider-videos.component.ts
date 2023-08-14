import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slider-videos',
  templateUrl: './slider-videos.component.html',
  styleUrls: ['./slider-videos.component.css']
})
export class SliderVideosComponent {

  /*Vector de prueba*/
  numVideos: number[] = [1,2,3];

  /*Icons to use*/
  iconVideo = iconos.faVideo;
}
