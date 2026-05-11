import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  newClientFormGroup!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.newClientFormGroup = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  handleSaveClient() {
    this.clientService.saveClient(this.newClientFormGroup.value).subscribe({
      next: c => {
        this.successMessage = `Client "${c.nom}" enregistré avec succès`;
        this.newClientFormGroup.reset();
        setTimeout(() => this.router.navigateByUrl('/clients'), 1200);
      },
      error: err => this.errorMessage = err.message
    });
  }
}
