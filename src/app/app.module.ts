import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonumentpanelComponent } from './monumentpanel/monumentpanel.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { RouterModule } from '@angular/router';
import { UsersService} from '../services/users.service';
import { MonumentsService } from '../services/monuments.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { PanelusersComponent } from './panelusers/panelusers.component';
import { MonumentviewComponent } from './monumentview/monumentview.component';
import { NavigationComponent } from './navigation/navigation.component';
import {NavbarService} from '../services/navbar.service';
import { EditmonumentComponent } from './monumentpanel/editmonument/editmonument.component';
import {AppService} from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    MonumentpanelComponent,
    UserpanelComponent,
    LoginComponent,
    PanelusersComponent,
    MonumentviewComponent,
    NavigationComponent,
    EditmonumentComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'monumentpanel' , component: MonumentpanelComponent },
      {path: 'userpanel' , component: UserpanelComponent },
      {path: 'login', component: LoginComponent},
      {path: '' , redirectTo: '/login', pathMatch: 'full' },
      {path: 'editmonument', component: EditmonumentComponent},
    ], {useHash: true})

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
