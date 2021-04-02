import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project, Projects} from './interfaces';
import {environment} from '../../environments/environment';
import {plainToClass} from 'class-transformer';

@Injectable({providedIn: 'root'})
export class ProjectsService {
  constructor (private http: HttpClient) { }

  getAll(): any {
    return this.http.get(`${environment.dbUrl}/projects`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return plainToClass(Projects, response)
        })
      )
  }


}
