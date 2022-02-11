import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const basicAuth = btoa(environment.basicAuthUser + ':' + environment.basicAuthPass);
    if (basicAuth) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + basicAuth)
      });
      return next.handle(authReq);
    }
    return next.handle(req);

  }
}
