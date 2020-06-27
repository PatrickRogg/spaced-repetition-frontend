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
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LayoutComponent } from './components/layout/layout.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'flash-card-decks/:id', component: FlashCardDeckDetailComponent, canActivate: [AuthGuard] },
  { path: 'spaced-repetition', component: SpacedRepetitionComponent, canActivate: [AuthGuard] },
  { path: 'spaced-repetition/stats', component: SpacedRepetitionStatsComponent, canActivate: [AuthGuard] },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'workspace/:username', component: LayoutComponent},
  { path: 'workspace/:username/:id', component: LayoutComponent },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
