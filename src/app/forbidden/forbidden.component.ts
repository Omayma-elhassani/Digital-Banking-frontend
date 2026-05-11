import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="container mt-5 text-center">
      <h1 class="display-1 text-danger">403</h1>
      <h3>Accès refusé</h3>
      <p class="text-muted">Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
      <a routerLink="/clients" class="btn btn-primary">Retour à l'accueil</a>
    </div>`
})
export class ForbiddenComponent {}
