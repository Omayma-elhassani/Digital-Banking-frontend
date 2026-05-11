import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientContratsComponent } from './client-contrats/client-contrats.component';
import { ContratsComponent } from './contrats/contrats.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  { path: 'clients', component: ClientsComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_EMPLOYE', 'ROLE_ADMIN'] } },

  { path: 'new-client', component: NewClientComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_EMPLOYE', 'ROLE_ADMIN'] } },

  { path: 'client-contrats/:id', component: ClientContratsComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_CLIENT', 'ROLE_EMPLOYE', 'ROLE_ADMIN'] } },

  { path: 'contrats', component: ContratsComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_EMPLOYE', 'ROLE_ADMIN'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
