import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { UserSignInRequestData } from './models/user-sign-in.request-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  email = ``;
  password = ``;
  areCredentialsWrong = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public signIn(): void {
    if (this.email === `` || this.password === ``) {
      return;
    }
    const data = new UserSignInRequestData(this.email, this.password);
    this.authService.signIn(data).subscribe(
      (data) => this.router.navigate(['/home']),
      (error) => (this.areCredentialsWrong = true)
    );
  }
}
