import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientContratsComponent } from './client-contrats/client-contrats.component';
import { ContratsComponent } from './contrats/contrats.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'new-client', component: NewClientComponent },
  { path: 'client-contrats/:id', component: ClientContratsComponent },
  { path: 'contrats', component: ContratsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
