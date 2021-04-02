import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from './interfaces';
import {environment} from './../../environments/environment';

@Injectable({providedIn: 'root'})
export class TodosService {
  constructor (private http: HttpClient) { }

  update(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${environment.dbUrl}/projects/${todo.project_id}/todo/${todo.id}`, todo)
  }
  // create(todo: Todo): Observable<Todo> {
  //   return this.http.post(`${environment.dbUrl}/todos.json`, todo)
  // }

}
