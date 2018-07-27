import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(
    private translate: TranslateService
  ) {}

  public initTranslate() {
    this.translate.addLangs(['de', 'en', 'es', 'fr', 'nl']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|nl/) ? browserLang : 'en');

  }

  public use(value: string): Observable<any> {
    return this.translate.use(value);
  }

  public getLangs(): string[] {
    return this.translate.getLangs();
  }

  public currentLang(): string {
    return this.translate.currentLang;
  }
}
