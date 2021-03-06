import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FlashCardDeckDetailComponent } from './components/flash-card-deck-detail/flash-card-deck-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SpacedRepetitionStatsComponent } from './components/spaced-repetition-stats/spaced-repetition-stats.component';
import { AuthGuard } from './guards/auth.guard';
import { SpacedRepetitionComponent } from './components/spaced-repetition/spaced-repetition.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'flash-card-decks/:id',
    component: FlashCardDeckDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spaced-repetition',
    component: SpacedRepetitionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spaced-repetition/stats',
    component: SpacedRepetitionStatsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'tutorial', component: TutorialComponent },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
