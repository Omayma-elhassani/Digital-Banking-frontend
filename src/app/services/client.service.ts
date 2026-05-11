import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../model/client.model';
import { ContratAssurance } from '../model/contrat.model';

@Injectable({ providedIn: 'root' })
export class ClientService {

  constructor(private http: HttpClient) {}

  listClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.backendHost}/api/clients`);
  }

  searchClients(keyword: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.backendHost}/api/clients/search?keyword=${keyword}`);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${environment.backendHost}/api/clients/${id}`);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.backendHost}/api/clients`, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${environment.backendHost}/api/clients/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/api/clients/${id}`);
  }

  getContratsByClient(clientId: number): Observable<ContratAssurance[]> {
    return this.http.get<ContratAssurance[]>(`${environment.backendHost}/api/clients/${clientId}/contrats`);
  }
}
