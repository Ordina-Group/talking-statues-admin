import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonumentsRoutingModule } from './monuments-routing.module';
import { MonumentpanelComponent } from './monumentpanel.component';
import { MonumentFilterPipe } from '../shared/monumentFilter.pipe';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component';
import { LanguageformComponent } from './monumentmanagement/languageform/languageform.component';
import { CommonformComponent } from './monumentmanagement/commonform/commonform.component';
import { QuestionformComponent } from './monumentmanagement/languageform/questionform/questionform.component';
import { MonumentmanagementComponent } from './monumentmanagement/monumentmanagement.component';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonumentsRoutingModule,
    MaterialModule,
  ],
  declarations: [
    MonumentpanelComponent,
    MonumentFilterPipe,
    LanguageformComponent,
    CommonformComponent,
    QuestionformComponent,
    MonumentmanagementComponent,
  ],
  providers: [
  ]
})
export class MonumentsModule { }
