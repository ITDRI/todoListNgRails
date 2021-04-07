import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, Output} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Projects} from './interfaces';
import {environment} from '../../environments/environment';
import {plainToClass} from 'class-transformer';
import {Observable, Subject, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProjectsService {

  @Output() error$: Subject<HttpErrorResponse> = new Subject()
  constructor (private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${environment.dbUrl}/projects`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return plainToClass(Projects, response)
        }),
        catchError(err => {
          this.error$.next(err)
          return throwError(err)
        })
      )
  }

  projectsTrack(_, item) {
    return item.id;
  }
}
