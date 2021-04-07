import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './interfaces';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => a.id > b.id ? 1 : -1)
  }
}
