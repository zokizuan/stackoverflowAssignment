import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './feature/questions/questions.component';

const routes: Routes = [
  { path: 'home', component:QuestionsComponent, data: { view: 'home' }},
  { path: 'questions', component:QuestionsComponent, data: { view: 'questions' } },
  { path: 'search', component:QuestionsComponent, data: { view: 'search' }},
  { path: '',  redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
