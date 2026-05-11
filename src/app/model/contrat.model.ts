import { Client } from './client.model';

export type StatutContrat = 'EN_COURS' | 'VALIDE' | 'RESILIE';
export type TypeLogement = 'APPARTEMENT' | 'MAISON' | 'LOCAL_COMMERCIAL';
export type NiveauCouverture = 'BASIQUE' | 'INTERMEDIAIRE' | 'PREMIUM';
export type TypePaiement = 'MENSUALITE' | 'PAIEMENT_ANNUEL' | 'PAIEMENT_EXCEPTIONNEL';
export type TypeContrat = 'AUTO' | 'HABITATION' | 'SANTE';

export interface ContratAssurance {
  id?: number;
  dateSouscription?: string;
  statut: StatutContrat;
  dateValidation?: string;
  montantCotisation: number;
  dureeContrat: number;
  tauxCouverture: number;
  client?: Client;
  type?: TypeContrat;
}

export interface ContratAssuranceAutomobile extends ContratAssurance {
  numeroImmatriculation: string;
  marqueVehicule: string;
  modeleVehicule: string;
}

export interface ContratAssuranceHabitation extends ContratAssurance {
  typeLogement: TypeLogement;
  adresseLogement: string;
  superficie: number;
}

export interface ContratAssuranceSante extends ContratAssurance {
  niveauCouverture: NiveauCouverture;
  nombrePersonnesCouvertes: number;
}

export interface Paiement {
  id?: number;
  date: string;
  montant: number;
  type: TypePaiement;
  contratId?: number;
}
