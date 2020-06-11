import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    public signIn(): void {
        this.router.navigate(['sign-in']);
    }

    public signUp(): void {
        this.router.navigate(['sign-up']);
    }

    public signOut(): void {
        this.authService.signOut();
    }

    public isSignedIn(): boolean {
        return this.authService.isSignedIn();
    }

}
