import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListMyPatientsComponent } from './list-my-patients/list-my-patients.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterMyPatientsComponent } from './register-my-patients/register-my-patients.component';
import { EditMyPatientsComponent } from './edit-my-patients/edit-my-patients.component';
import { SweetAlerts } from '../../alerts/alerts.component';
import { ViewMyPatientsComponent } from './modals/view-my-patients/view-my-patients.component';
import { ViewProgressMyPatientsComponent } from './view-progress-my-patients/view-progress-my-patients.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewDetailProgressMyPatientsComponent } from './modals/view-detail-progress-my-patients/view-detail-progress-my-patients.component';

@NgModule({
  declarations: [
    RegisterMyPatientsComponent,
    ListMyPatientsComponent,
    EditMyPatientsComponent,
    ViewMyPatientsComponent,
    ViewProgressMyPatientsComponent,
    ViewDetailProgressMyPatientsComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports:[
    RegisterMyPatientsComponent,
  ],
  providers:[
    SweetAlerts
  ]
})
export class PatientsModule { }
