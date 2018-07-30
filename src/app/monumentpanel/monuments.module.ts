import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MonumentsRoutingModule } from './monuments-routing.module';
import { MonumentpanelComponent } from './monumentpanel.component';
import { MonumentFilterPipe } from '../shared/monumentFilter.pipe';
import { LanguageformComponent } from './monumentmanagement/languageform/languageform.component';
import { CommonformComponent } from './monumentmanagement/commonform/commonform.component';
import { QuestionformComponent } from './monumentmanagement/languageform/questionform/questionform.component';
import { MonumentmanagementComponent } from './monumentmanagement/monumentmanagement.component';
import { MaterialModule } from '../material.module';

// AoT requires an exported function for factories
export function createTranlateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/monument/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonumentsRoutingModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranlateLoader,
        deps: [HttpClient]
      },
      isolate: true
    })
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
export class MonumentsModule {
  constructor(private _translate: TranslateService) {
    // const browserLang = this._translate.getBrowserLang();
    // this._translate.use(browserLang.match(/de|en|es|fr|nl/) ? browserLang : 'en');
    // this._translate.use('de');
    // this._translate.use('en');
    // this._translate.use('es');
    // this._translate.use('fr');
    // this._translate.use('nl');
  }
}
