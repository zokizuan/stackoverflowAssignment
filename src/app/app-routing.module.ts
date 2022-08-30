import { SearchComponent } from './feature/search/search.component';
import { HomeComponent } from './feature/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './feature/questions/questions.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questions', component:QuestionsComponent, },
  { path: 'search', component:SearchComponent, },
  { path: '',  redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
