import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GlobalSpinnerInterceptor } from './interceptor/global-spinner.interceptor';
import { SearchBarComponent } from './feature/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './feature/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FilterTextPopupComponent } from './feature/search-bar/filter-text-popup/filter-text-popup.component';
import { HomeComponent } from './feature/home/home.component';
import { SearchComponent } from './feature/search/search.component';
import { QuestionsComponent } from './feature/questions/questions.component';
import { ErrorCatchingInterceptor } from './interceptor/error-catching.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SidebarComponent,
    FilterTextPopupComponent,
    HomeComponent,
    SearchComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalSpinnerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
