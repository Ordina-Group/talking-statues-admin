import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { RouterModule } from '@angular/router';
import { UsersService} from '../services/users.service';
import { MonumentsService } from '../services/monuments.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MonumentviewComponent } from './monumentview/monumentview.component';
import { NavigationComponent } from './navigation/navigation.component';
import {NavbarService} from '../services/navbar.service';
import { EditmonumentComponent } from './monumentpanel/editmonument/editmonument.component';
import {AuthService} from '../services/auth.service';
import {AppService} from './app.service';
import { FilterPipe } from './shared/userFilter.pipe';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserpanelComponent,
    LoginComponent,
    MonumentviewComponent,
    NavigationComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'userpanel' , component: UserpanelComponent },
      {path: 'login', component: LoginComponent},
      {path: '' , redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'monuments',
        loadChildren: './monumentpanel/monuments.module#MonumentsModule',
      },
      {path: 'logout', component: LoginComponent}
    ], {useHash: false})

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
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
