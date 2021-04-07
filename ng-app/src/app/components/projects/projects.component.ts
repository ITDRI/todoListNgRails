import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {Projects, Todo} from './../../shared/interfaces';
import {TodosService} from './../../shared/todos.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @Input() project: Projects
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
    todo.isCompleted = isCompleted
    this.updateSub = this.todosService.update(todo).subscribe(response => {
      const updTodoIndex = this.project.todos.findIndex(todo => todo.id === response.id)
      this.project.todos[updTodoIndex] = response
    })
  }

  ngOnDestroy() {
    if (this.updateSub) this.updateSub.unsubscribe()
    if (this.errSub) this.errSub.unsubscribe()
  }

  todosTrack(_, todo: Todo) {
    return todo.id
  }

}
