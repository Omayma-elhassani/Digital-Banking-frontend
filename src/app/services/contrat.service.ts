import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ContratAssurance,
  ContratAssuranceAutomobile,
  ContratAssuranceHabitation,
  ContratAssuranceSante,
  Paiement
} from '../model/contrat.model';

@Injectable({ providedIn: 'root' })
export class ContratService {

  constructor(private http: HttpClient) {}

  listContrats(): Observable<ContratAssurance[]> {
    return this.http.get<ContratAssurance[]>(`${environment.backendHost}/api/contrats`);
  }

  getContrat(id: number): Observable<ContratAssurance> {
    return this.http.get<ContratAssurance>(`${environment.backendHost}/api/contrats/${id}`);
  }

  saveContratAutomobile(clientId: number, dto: ContratAssuranceAutomobile): Observable<ContratAssuranceAutomobile> {
    return this.http.post<ContratAssuranceAutomobile>(
      `${environment.backendHost}/api/contrats/automobile/${clientId}`, dto);
  }

  saveContratHabitation(clientId: number, dto: ContratAssuranceHabitation): Observable<ContratAssuranceHabitation> {
    return this.http.post<ContratAssuranceHabitation>(
      `${environment.backendHost}/api/contrats/habitation/${clientId}`, dto);
  }

  saveContratSante(clientId: number, dto: ContratAssuranceSante): Observable<ContratAssuranceSante> {
    return this.http.post<ContratAssuranceSante>(
      `${environment.backendHost}/api/contrats/sante/${clientId}`, dto);
  }

  validerContrat(id: number): Observable<ContratAssurance> {
    return this.http.put<ContratAssurance>(`${environment.backendHost}/api/contrats/${id}/valider`, {});
  }

  resilierContrat(id: number): Observable<ContratAssurance> {
    return this.http.put<ContratAssurance>(`${environment.backendHost}/api/contrats/${id}/resilier`, {});
  }

  deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/api/contrats/${id}`);
  }

  getPaiements(contratId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${environment.backendHost}/api/contrats/${contratId}/paiements`);
  }

  ajouterPaiement(contratId: number, paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${environment.backendHost}/api/paiements/${contratId}`, paiement);
  }

  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/api/paiements/${id}`);
  }
}
