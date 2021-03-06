import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlashCardDeckOverviewComponent } from './components/home/flash-card-deck-overview/flash-card-deck-overview.component';
import { FlashCardDeckDetailComponent } from './components/flash-card-deck-detail/flash-card-deck-detail.component';
import { FlashCardDeckDetailTitleComponent } from './components/flash-card-deck-detail/flash-card-deck-detail-title/flash-card-deck-detail-title.component';
import { HomeComponent } from './components/home/home.component';
import { SpacedRepetitionStatsComponent } from './components/spaced-repetition-stats/spaced-repetition-stats.component';
import { SpacedRepetitionStatsOverviewComponent } from './components/spaced-repetition-stats/spaced-repetition-stats-overview/spaced-repetition-stats-overview.component';
import { SpacedRepetitionStatsDetailComponent } from './components/spaced-repetition-stats/spaced-repetition-stats-detail/spaced-repetition-stats-detail.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { CreateFlashCardComponent } from './components/flash-card-deck-detail/topic-with-flash-cards/flash-cards/create-flash-card/create-flash-card.component';
import { SpacedRepetitionComponent } from './components/spaced-repetition/spaced-repetition.component';
import { CreateTopicComponent } from './components/flash-card-deck-detail/create-topic/create-topic.component';
import { TopicWithFlashCardsComponent } from './components/flash-card-deck-detail/topic-with-flash-cards/topic-with-flash-cards.component';
import { FlashCardsComponent } from './components/flash-card-deck-detail/topic-with-flash-cards/flash-cards/flash-cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateFlashCardDeckComponent } from './components/home/flash-card-deck-overview/create-flash-card-deck/create-flash-card-deck.component';
import { EditFlashCardComponent } from './shared/components/edit-flash-card/edit-flash-card.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HomeStudyComponent } from './components/home/home-study/home-study.component';
import { LandingPageHeaderComponent } from './components/landing-page/landing-page-header/landing-page-header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { HowItWorksComponent } from './components/landing-page/how-it-works/how-it-works.component';
import { LandingPageFlashCardComponent } from './components/landing-page/landing-page-header/landing-page-flash-card/landing-page-flash-card.component';
import { HowConstantTimeWorksComponent } from './components/landing-page/how-constant-time-works/how-constant-time-works.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    FooterComponent,
    FlashCardDeckOverviewComponent,
    FlashCardDeckDetailComponent,
    FlashCardDeckDetailTitleComponent,
    HomeComponent,
    SpacedRepetitionStatsComponent,
    SpacedRepetitionStatsOverviewComponent,
    SpacedRepetitionStatsDetailComponent,
    RichTextEditorComponent,
    CreateFlashCardComponent,
    SpacedRepetitionComponent,
    CreateTopicComponent,
    TopicWithFlashCardsComponent,
    FlashCardsComponent,
    EditFlashCardComponent,
    CreateFlashCardDeckComponent,
    SafeHtmlPipe,
    HomeStudyComponent,
    LandingPageHeaderComponent,
    LandingPageFlashCardComponent,
    TutorialComponent,
    HowItWorksComponent,
    HowConstantTimeWorksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    SharedModule,
    NgbModule,
    CKEditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
