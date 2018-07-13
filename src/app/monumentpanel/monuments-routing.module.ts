import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonumentpanelComponent } from './monumentpanel.component';
import { EditmonumentComponent } from './editmonument/editmonument.component';
import {AuthguardService} from '../../services/authguard.service';
import {AddmonumentComponent} from './addmonument/addmonument.component';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: '',
    component: MonumentpanelComponent
  },
  {path: 'monumentpanel' , component: MonumentpanelComponent, canActivate: [AuthguardService] },
  {path: ':id', component: EditmonumentComponent, canActivate: [AuthguardService]},
  {
    path: ':addmonument',
    component: AddmonumentComponent,
    canActivate: [AuthguardService]
  },
  {
    path: ':id',
    component: EditmonumentComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonumentsRoutingModule { }
