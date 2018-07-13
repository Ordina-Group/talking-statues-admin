import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonumentsRoutingModule } from './monuments-routing.module';
import { MonumentpanelComponent } from './monumentpanel.component';
import { TabsModule} from 'ngx-tabs';
import { MonumentFilterPipe } from '../shared/monumentFilter.pipe';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component';
import { LanguageformComponent } from './monumentmanagement/languageform/languageform.component';
import { CommonformComponent } from './monumentmanagement/commonform/commonform.component';
import { QuestionformComponent } from './monumentmanagement/languageform/questionform/questionform.component';
import { MonumentmanagementComponent } from './monumentmanagement/monumentmanagement.component';


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
    MonumentFilterPipe,
    LanguageformComponent,
    CommonformComponent,
    QuestionformComponent,
    MonumentmanagementComponent
  ],
  providers: [
  ]
})
export class MonumentsModule { }
