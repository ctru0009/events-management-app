import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';
import { TranslateComponent } from './components/translate/translate.component';
import { G1StatsComponent } from './components/g1-stats/g1-stats.component';
import { G2StatsComponent } from './components/g2-stats/g2-stats.component';

const routes: Routes = [
  { path: '', component: AddCategoryComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-categories', component: ListCategoriesComponent },
  { path: 'delete-category', component: DeleteCategoryComponent },
  { path: 'update-category', component: UpdateCategoryComponent },
  { path: 'display-category', component: DisplayCategoryComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'list-events', component: ListEventsComponent},
  { path: 'delete-event', component: DeleteEventComponent },
  { path: 'update-event', component: UpdateEventComponent },
  { path: 'display-event', component: DisplayEventComponent },
  { path: 'text-to-speech', component: TextToSpeechComponent },
  { path: 'translate', component: TranslateComponent },
  { path: 'g1-stats', component: G1StatsComponent },
  { path: 'g2-stats', component: G2StatsComponent },
  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    FormsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
