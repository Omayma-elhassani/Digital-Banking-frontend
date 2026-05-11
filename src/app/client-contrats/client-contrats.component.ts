import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientService } from '../services/client.service';
import { ContratService } from '../services/contrat.service';
import { Client } from '../model/client.model';
import { ContratAssurance, Paiement, TypeContrat } from '../model/contrat.model';

@Component({
  selector: 'app-client-contrats',
  templateUrl: './client-contrats.component.html',
  styleUrls: ['./client-contrats.component.css']
})
export class ClientContratsComponent implements OnInit {
  client!: Client;
  contrats: ContratAssurance[] = [];
  paiements: Paiement[] = [];
  selectedContrat: ContratAssurance | null = null;
  errorMessage = '';

  contratFormGroup!: FormGroup;
  paiementFormGroup!: FormGroup;
  typeChoisi: TypeContrat = 'AUTO';

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private contratService: ContratService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getClient(clientId).subscribe({ next: c => this.client = c });
    this.loadContrats(clientId);
    this.buildContratForm();
    this.paiementFormGroup = this.fb.group({
      montant: this.fb.control(0, [Validators.required, Validators.min(0.01)]),
      type: this.fb.control('MENSUALITE', Validators.required)
    });
  }

  loadContrats(clientId: number) {
    this.clientService.getContratsByClient(clientId).subscribe({
      next: list => this.contrats = list,
      error: err => this.errorMessage = err.message
    });
  }

  buildContratForm() {
    this.contratFormGroup = this.fb.group({
      type: this.fb.control('AUTO', Validators.required),
      montantCotisation: this.fb.control(2000, [Validators.required, Validators.min(0.01)]),
      dureeContrat: this.fb.control(12, [Validators.required, Validators.min(1)]),
      tauxCouverture: this.fb.control(80, [Validators.required, Validators.min(0), Validators.max(100)]),
      // automobile
      numeroImmatriculation: this.fb.control(''),
      marqueVehicule: this.fb.control(''),
      modeleVehicule: this.fb.control(''),
      // habitation
      typeLogement: this.fb.control('APPARTEMENT'),
      adresseLogement: this.fb.control(''),
      superficie: this.fb.control(80),
      // santé
      niveauCouverture: this.fb.control('BASIQUE'),
      nombrePersonnesCouvertes: this.fb.control(1)
    });
  }

  onTypeChange() {
    this.typeChoisi = this.contratFormGroup.value.type;
  }

  handleSaveContrat() {
    const v = this.contratFormGroup.value;
    const common = {
      statut: 'EN_COURS' as const,
      montantCotisation: v.montantCotisation,
      dureeContrat: v.dureeContrat,
      tauxCouverture: v.tauxCouverture
    };

    let obs: Observable<ContratAssurance>;
    if (v.type === 'AUTO') {
      obs = this.contratService.saveContratAutomobile(this.client.id!, {
        ...common,
        numeroImmatriculation: v.numeroImmatriculation,
        marqueVehicule: v.marqueVehicule,
        modeleVehicule: v.modeleVehicule
      }) as Observable<ContratAssurance>;
    } else if (v.type === 'HABITATION') {
      obs = this.contratService.saveContratHabitation(this.client.id!, {
        ...common,
        typeLogement: v.typeLogement,
        adresseLogement: v.adresseLogement,
        superficie: v.superficie
      }) as Observable<ContratAssurance>;
    } else {
      obs = this.contratService.saveContratSante(this.client.id!, {
        ...common,
        niveauCouverture: v.niveauCouverture,
        nombrePersonnesCouvertes: v.nombrePersonnesCouvertes
      }) as Observable<ContratAssurance>;
    }
    obs.subscribe({
      next: () => {
        this.loadContrats(this.client.id!);
        this.contratFormGroup.reset({ type: 'AUTO', montantCotisation: 2000, dureeContrat: 12, tauxCouverture: 80 });
      }
    });
  }

  handleValider(c: ContratAssurance) {
    this.contratService.validerContrat(c.id!).subscribe({ next: () => this.loadContrats(this.client.id!) });
  }
  handleResilier(c: ContratAssurance) {
    this.contratService.resilierContrat(c.id!).subscribe({ next: () => this.loadContrats(this.client.id!) });
  }
  handleDeleteContrat(c: ContratAssurance) {
    if (!confirm('Supprimer ce contrat ?')) return;
    this.contratService.deleteContrat(c.id!).subscribe({ next: () => this.loadContrats(this.client.id!) });
  }

  selectContrat(c: ContratAssurance) {
    this.selectedContrat = c;
    this.contratService.getPaiements(c.id!).subscribe({ next: p => this.paiements = p });
  }

  handleAjouterPaiement() {
    if (!this.selectedContrat) return;
    const v = this.paiementFormGroup.value;
    this.contratService.ajouterPaiement(this.selectedContrat.id!, {
      date: new Date().toISOString().substring(0, 10),
      montant: v.montant,
      type: v.type
    }).subscribe({ next: () => this.selectContrat(this.selectedContrat!) });
  }
}
