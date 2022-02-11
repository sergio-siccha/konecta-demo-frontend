import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PunctuationComponent} from './components/course/punctuation/punctuation.component';
import {CourseComponent} from './components/course/management/course.component';
import {CourseCreateComponent} from './components/course/management/course-create/course-create.component';
import {CourseUpdateComponent} from './components/course/management/course-update/course-update.component';

const routes: Routes = [
  {path: 'punctuation', component: PunctuationComponent},
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'create',
    component: CourseCreateComponent
  },
  {
    path: 'update',
    component: CourseUpdateComponent
  },
  {path: '**', pathMatch: 'full', redirectTo: 'punctuation'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
