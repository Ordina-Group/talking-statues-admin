
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ControllerService } from './controller.service';
import { MonumentDialogComponent } from './monument-dialog/monument-dialog.component';
import { SureDialogComponent } from './sure-dialog/sure-dialog.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMonumentComponent } from './edit-monument/edit-monument.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MonumentDialogComponent,
    SureDialogComponent,
    EditMonumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
