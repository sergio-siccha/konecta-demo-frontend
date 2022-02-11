import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { CourseComponent } from './components/course/management/course.component';
import { PunctuationComponent } from './components/course/punctuation/punctuation.component';
import {BasicInterceptor} from './interceptor/basic.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CourseCreateComponent } from './components/course/management/course-create/course-create.component';
import {FormsModule} from '@angular/forms';
import { CourseUpdateComponent } from './components/course/management/course-update/course-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseComponent,
    PunctuationComponent,
    CourseCreateComponent,
    CourseUpdateComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
