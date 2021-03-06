import {ConditionalExpr} from '@angular/compiler';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Projects, NewTodo, Todo} from './../../shared/interfaces';
import {TodosService} from './../../shared/todos.service';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.scss']
})
export class CreateTodoModalComponent implements OnInit, OnDestroy {

  @Input() projects: Projects[]
  @Output() hideModal = new EventEmitter<void>()
  @Output() onError = new EventEmitter<string>()
  createTodoform: FormGroup
  newTodo: NewTodo
  showAdditionalField: boolean = false
  createSub: Subscription
  errSub: Subscription
  title = "Новая задача"
  submitted = false


  constructor (private todosService: TodosService) { }

  ngOnInit(): void {
    this.createTodoform = new FormGroup({
      todoTextFormControl: new FormControl('', Validators.required),
      projectIdFormControl: new FormControl('', Validators.required)
    })
    this.errSub = this.todosService.error$.subscribe(err => {
      this.onError.emit(err)
    })
  }

  ngOnDestroy() {
    if (this.createSub) this.createSub.unsubscribe()
    if (this.errSub) this.errSub.unsubscribe()
  }

  addNewCategory(): void {
    let projectId: number = this.createTodoform.get('projectIdFormControl').value
    if (projectId < 0) {
      this.showAdditionalField = true
      this.createTodoform.addControl('projectTitleFormControl', new FormControl('', Validators.required))
      this.createTodoform.get('projectTitleFormControl').reset()
    } else {
      this.showAdditionalField = false
      this.createTodoform.removeControl('projectTitleFormControl')
    }
  }

  submit(): void {
    if (this.createTodoform.valid) {
      this.submitted = true
      this.newTodo =
      {
        text: this.createTodoform.value.todoTextFormControl,
        project_id: this.createTodoform.value.projectIdFormControl,
        project_title: this.createTodoform.value.projectTitleFormControl,
        isCompleted: false
      }
      this.createSub = this.todosService.create(this.newTodo).subscribe((response) => {
        if (response instanceof Projects) {
          this.projects.push(response)
        } else if (response instanceof Todo) {
          const projId = this.projects.findIndex(proj => proj.id === response.project_id)
          this.projects[projId].todos.push(response)
        }
        this.hideModal.emit()
      }, () => this.hideModal.emit()
      )
    }
  }

  todosTrack(_, todo: Todo) {
    return todo.id
  }
}
