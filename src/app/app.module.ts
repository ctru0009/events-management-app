import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { DisplayCategoryComponent } from './components/display-category/display-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { DeleteEventComponent } from './components/delete-event/delete-event.component';
import { DisplayEventComponent } from './components/display-event/display-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TocapitalPipe } from './pipes/tocapital.pipe';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';
import { TranslateComponent } from './components/translate/translate.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { G1StatsComponent } from './components/g1-stats/g1-stats.component';
import { G2StatsComponent } from './components/g2-stats/g2-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    DeleteCategoryComponent,
    DisplayCategoryComponent,
    UpdateCategoryComponent,
    AddEventComponent,
    ListEventsComponent,
    DeleteEventComponent,
    DisplayEventComponent,
    UpdateEventComponent,
    InvalidDataComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    TocapitalPipe,
    DurationFormatPipe,
    TextToSpeechComponent,
    TranslateComponent,
    G1StatsComponent,
    G2StatsComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
