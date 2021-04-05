import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {plainToClass} from 'class-transformer';
import {Subscription} from 'rxjs';
import {Project, Todo, Todos} from './../../shared/interfaces';
import {TodosService} from './../../shared/todos.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnDestroy {
  @Input()
  project: Project
  updateSub: Subscription

  constructor (private TodosService: TodosService) { }

  update(isCompleted: boolean, todo: Todo) {
    const updTodo = plainToClass(Todos, todo)
    updTodo.complete = isCompleted
    this.updateSub = this.TodosService.update(updTodo).subscribe()
  }

  ngOnDestroy() {
    if (this.updateSub) this.updateSub.unsubscribe()
  }
}
