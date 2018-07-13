import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonumentsRoutingModule } from './monuments-routing.module';
import { MonumentpanelComponent } from './monumentpanel.component';
import { EditmonumentComponent } from './editmonument/editmonument.component';
import { TabsModule} from 'ngx-tabs';
import { MonumentFilterPipe } from '../shared/monumentFilter.pipe';
import { AddmonumentComponent } from './addmonument/addmonument.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MonumentsRoutingModule,
    FormsModule,
    TabsModule,
    FormsModule,
  ],
  declarations: [
    MonumentpanelComponent,
    EditmonumentComponent,
    MonumentFilterPipe,
    AddmonumentComponent,
  ],
  providers: [
  ]
})
export class MonumentsModule { }
