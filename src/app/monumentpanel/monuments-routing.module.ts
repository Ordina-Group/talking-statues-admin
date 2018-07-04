import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonumentpanelComponent } from './monumentpanel.component';
import { EditmonumentComponent } from './editmonument/editmonument.component';


const routes: Routes = [
  {
    path: '',
    component: MonumentpanelComponent
  },
  {path: 'monumentpanel' , component: MonumentpanelComponent },
  {path: ':id', component: EditmonumentComponent},
  {
    path: 'addMonument',
    component: EditmonumentComponent
  },
  {
    path: ':id',
    component: EditmonumentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonumentsRoutingModule { }
