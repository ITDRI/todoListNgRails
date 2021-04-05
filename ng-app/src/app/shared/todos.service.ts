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
        catchError(err => {
          this.error$.next(err.message)
          return throwError(err)
        }
        )
      )
  }

  create(newTodo: NewTodo): Observable<NewTodo> {
    return this.http.post<NewTodo>(`${environment.dbUrl}/todo`, newTodo)
      .pipe(
        catchError(err => {
          this.error$.next(err.message)
          return throwError(err)
        }
        )
      )
  }
}
