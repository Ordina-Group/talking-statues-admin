import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UsersService} from '../services/users.service';
import { MonumentsService } from '../services/monuments.service';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from '../services/auth.service';
import { FilterPipe } from './shared/userFilter.pipe';
import { AuthInterceptor } from '../services/auth.interceptor';
import { AuthguardService } from '../services/authguard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MaterialModule } from './material.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    UserpanelComponent,
    LoginComponent,
    NavigationComponent,
    FilterPipe,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'userpanel' , component: UserpanelComponent, canActivate: [AuthguardService] },
      {path: 'login', component: LoginComponent},
      {path: '' , redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'monuments',
        loadChildren: './monumentpanel/monuments.module#MonumentsModule', canActivate: [AuthguardService]
      },
      {path: 'logout', component: LoginComponent},
      {path: '**', component: PagenotfoundComponent, redirectTo: ''}
    ], {useHash: false}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    UsersService,
    MonumentsService,
    NavbarService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthguardService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
