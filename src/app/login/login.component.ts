import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
  }

  handleLogin() {
    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigateByUrl('/clients'),
      error: () => this.errorMessage = 'Identifiants incorrects'
    });
  }
}
