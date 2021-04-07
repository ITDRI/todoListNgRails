import {HttpClient} from '@angular/common/http';
import {Injectable, Output} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {NewTodo, Projects, Todo} from './interfaces';
import {environment} from './../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable({providedIn: 'root'})
export class TodosService {

  @Output() error$: Subject<string> = new Subject()
  constructor (private http: HttpClient) { }

  update(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${environment.dbUrl}/projects/${todo.project_id}/todo/${todo.id}`, todo)
      .pipe(
        catchError(err => {
          this.error$.next(err)
          return throwError(err)
        }
        )
      )
  }

  create(newTodo: NewTodo): Observable<any> {
    return this.http.post<NewTodo>(`${environment.dbUrl}/todo`, newTodo)
      .pipe(
        map((response: {[key: string]: any}) => {
          if (response.todos) return plainToClass(Projects, response)
          else return plainToClass(Todo, response)
        }),
        catchError(err => {
          this.error$.next(err)
          return throwError(err)
        }
        )
      )
  }
}
