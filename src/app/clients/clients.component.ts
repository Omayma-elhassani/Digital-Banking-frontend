import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, catchError, throwError } from 'rxjs';
import { Client } from '../model/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients!: Observable<Client[]>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({ keyword: this.fb.control('') });
    this.handleSearchClients();
  }

  handleSearchClients() {
    let kw = this.searchFormGroup.value.keyword;
    this.clients = (kw ? this.clientService.searchClients(kw) : this.clientService.listClients()).pipe(
      catchError(err => { this.errorMessage = err.message; return throwError(() => err); })
    );
  }

  handleDeleteClient(c: Client) {
    if (!confirm(`Supprimer le client ${c.nom} ?`)) return;
    this.clientService.deleteClient(c.id!).subscribe({ next: () => this.handleSearchClients() });
  }

  handleClientContrats(c: Client) {
    this.router.navigateByUrl(`/client-contrats/${c.id}`);
  }
}
