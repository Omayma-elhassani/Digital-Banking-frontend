import { Component, OnInit } from '@angular/core';
import { ContratService } from '../services/contrat.service';
import { ContratAssurance } from '../model/contrat.model';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {
  contrats: ContratAssurance[] = [];
  errorMessage = '';
  filtreStatut = '';

  constructor(private contratService: ContratService) {}

  ngOnInit(): void { this.loadContrats(); }

  loadContrats() {
    this.contratService.listContrats().subscribe({
      next: list => this.contrats = list,
      error: err => this.errorMessage = err.message
    });
  }

  get filtered() {
    return this.filtreStatut ? this.contrats.filter(c => c.statut === this.filtreStatut) : this.contrats;
  }

  typeOf(c: any): string {
    if (c.marqueVehicule) return 'AUTO';
    if (c.typeLogement) return 'HABITATION';
    if (c.niveauCouverture) return 'SANTE';
    return '?';
  }
}
