import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from './interfaces';
import {environment} from './../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class TodosService {
  constructor (private http: HttpClient) { }

  // create(todo: Todo): Observable<Todo> {
  //   return this.http.post(`${environment.dbUrl}/todos.json`, todo)
  // }

}
