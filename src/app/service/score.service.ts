import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../models/response';
import {CourseRegisterRequest} from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private baseUrl = environment.baseUrl + 'konecta-api/v1/score/';

  constructor(private http: HttpClient) {}

  vote(courseName: string, score: number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + courseName + '/' + score);
  }
}
