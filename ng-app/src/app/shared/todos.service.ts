import {HttpClient} from '@angular/common/http';
import {Injectable, Output} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {NewTodo, Todo} from './interfaces';
import {environment} from './../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TodosService {

  @Output() error$: Subject<string> = new Subject()
  constructor (private http: HttpClient) { }

  update(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${environment.dbUrl}/projects/${todo.project_id}/todo/${todo.id}`, todo)
      .pipe(
        catchError(error => {
          this.error$.next(error.message)
          return throwError(error)
        }
        )
      )
  }

  create(newTodo: NewTodo): Observable<NewTodo> {
    return this.http.post<NewTodo>(`${environment.dbUrl}/todo`, newTodo)
      .pipe(
        catchError(error => {
          this.error$.next(error.message)
          return throwError(error)
        }
        )
      )
  }
}
