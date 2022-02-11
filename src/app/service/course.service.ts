import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../models/response';
import {Course, CourseRegisterRequest} from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = environment.baseUrl + 'konecta-api/v1/course/';

  // tslint:disable-next-line:variable-name
  private _courseForUpdate: Course;

  get userForUpdate(): Course {
    return this._courseForUpdate;
  }

  set userForUpdate(value: Course) {
    this._courseForUpdate = value;
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl);
  }

  save(request: CourseRegisterRequest): Observable<Response> {
    return this.http.post<Response>(this.baseUrl, request);
  }

  deleteByName(courseName: string): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + courseName);
  }

  update(request: CourseRegisterRequest, currentCourseName: string): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + currentCourseName, request);
  }
}
