import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpRequestData } from './models/user-sign-up.request-model';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { ErrorResponse } from 'src/app/shared/models/error-response.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errors: ErrorResponse = new ErrorResponse({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });
  }

  public signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    const form = this.signUpForm;
    const data = new UserSignUpRequestData(
      form.get('username').value,
      form.get('email').value,
      form.get('password').value
    );
    this.authService.signUp(data).subscribe(
      (data) => {
        this.router.navigate([`/home`]);
      },
      (error) => {
        this.errors = error.error.errors;
      }
    );
  }
}
