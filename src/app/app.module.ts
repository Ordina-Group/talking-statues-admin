import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonumentpanelComponent } from './monumentpanel/monumentpanel.component';
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
import {AppService} from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    UserpanelComponent,
    LoginComponent,
    MonumentviewComponent,
    NavigationComponent,

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
    ], {useHash: false})

  ],
  providers: [
    UsersService,
    MonumentsService,
    NavbarService,
    AppService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
