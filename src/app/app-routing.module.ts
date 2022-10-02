import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MisionComponent } from './components/mision/mision.component';
import { VisionComponent } from './components/vision/vision.component';
import { LoginComponent } from './seguridad/login/login.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
