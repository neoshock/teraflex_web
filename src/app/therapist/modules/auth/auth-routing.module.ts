import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


//Rutas hijas
const routes:Routes =[
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent},
      { path: '**', redirectTo:'login'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutinModule { }