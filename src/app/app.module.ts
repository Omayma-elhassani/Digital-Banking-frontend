import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientsComponent } from './clients/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientContratsComponent } from './client-contrats/client-contrats.component';
import { ContratsComponent } from './contrats/contrats.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientsComponent,
    NewClientComponent,
    ClientContratsComponent,
    ContratsComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
