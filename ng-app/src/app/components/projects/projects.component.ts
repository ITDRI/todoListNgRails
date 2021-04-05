import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {plainToClass} from 'class-transformer';
import {Subscription} from 'rxjs';
import {Project, Todo, Todos} from './../../shared/interfaces';
import {TodosService} from './../../shared/todos.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @Input() project: Project
  @Output() onError = new EventEmitter<string>()
  updateSub: Subscription
  errSub: Subscription

  constructor (private todosService: TodosService) { }

  ngOnInit() {
    this.errSub = this.todosService.error$.subscribe(err => {
      this.onError.emit(err)
    })
  }

  update(isCompleted: boolean, todo: Todo) {
    const updTodo = plainToClass(Todos, todo)
    updTodo.complete = isCompleted
    this.updateSub = this.todosService.update(updTodo).subscribe()
  }

  ngOnDestroy() {
    if (this.updateSub) this.updateSub.unsubscribe()
    if (this.errSub) this.errSub.unsubscribe()
  }
}
