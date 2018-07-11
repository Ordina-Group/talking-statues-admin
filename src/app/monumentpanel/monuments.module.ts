import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonumentsRoutingModule } from './monuments-routing.module';
import { MonumentpanelComponent } from './monumentpanel.component';
import { EditmonumentComponent } from './editmonument/editmonument.component';
import {TabsModule} from 'ngx-tabs';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MonumentsRoutingModule,
    FormsModule,
    TabsModule,
  ],
  declarations: [
    MonumentpanelComponent,
    EditmonumentComponent,
  ],
  providers: []
})
export class MonumentsModule { }
