import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './Pages/LoginPage/LoginPage.component';
import { Logs } from './Pages/Logs/Logs.component';
import { ProjectComponent } from './Pages/ProjectList/Project.component';
import { RegisterComponent } from './Pages/Registration/Register.component';

const routes: Routes = [
  { path: 'Login', component: LoginPage },
  { path: '', redirectTo: 'Login', pathMatch: "full" },
  { path: 'Register', component: RegisterComponent },
  { path: 'Project', component: ProjectComponent },
  { path: 'Logs', component: Logs },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
