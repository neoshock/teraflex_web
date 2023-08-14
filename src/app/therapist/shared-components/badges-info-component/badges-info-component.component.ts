import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badges-info-component',
  templateUrl: './badges-info-component.component.html',
  styleUrls: ['./badges-info-component.component.css']
})
export class BadgesInfoComponentComponent {
  //add input for name, icon and color
  @Input() title: string = '';
  @Input() subtile: string = '';
  @Input() icon: string = '';
  @Input() color: string = '';
}
