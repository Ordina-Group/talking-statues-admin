import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonumentpanelComponent } from './monumentpanel.component';
import {AuthguardService} from '../../services/authguard.service';
import { MonumentmanagementComponent } from './monumentmanagement/monumentmanagement.component';


const routes: Routes = [
  {
    path: '',
    component: MonumentpanelComponent
  },
  {path: 'monumentpanel' , component: MonumentpanelComponent, canActivate: [AuthguardService] },
  {path: ':id', component: MonumentmanagementComponent, canActivate: [AuthguardService]},
  {
    path: 'addmonument',
    component: MonumentmanagementComponent,
    canActivate: [AuthguardService]
  },
  {
    path: ':id',
    component: MonumentmanagementComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonumentsRoutingModule { }
