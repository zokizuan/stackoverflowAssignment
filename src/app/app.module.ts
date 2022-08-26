import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GlobalErrorHandler } from './core/error-handler/globa-error-handler';
import { GlobalSpinnerInterceptor } from './interceptor/global-spinner.interceptor';
import { SearchBarComponent } from './feature/search-bar/search-bar.component';
import { QuestionsComponent } from './feature/questions/questions.component';
import { SidebarComponent } from './feature/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  providers: [ { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalSpinnerInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
