import {ConditionalExpr} from '@angular/compiler';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {plainToClass} from 'class-transformer';
import {Subscription} from 'rxjs';
import {Projects, NewTodo} from './../../shared/interfaces';
import {TodosService} from './../../shared/todos.service';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.scss']
})
export class CreateTodoModalComponent implements OnInit, OnDestroy {

  @Input() projects: Projects[]
  @Output() hideModal = new EventEmitter<void>()
  @Output() onAddNewTodo = new EventEmitter<void>()
  createTodoform: FormGroup
  newTodo: NewTodo
  showAdditionalField: boolean = false
  createSub: Subscription
  title = "Новая задача"

  constructor (private todosService: TodosService) { }

  ngOnInit(): void {
    this.createTodoform = new FormGroup({
      todoTextFormControl: new FormControl('', Validators.required),
      projectIdFormControl: new FormControl('', Validators.required)
    })
  }

  ngOnDestroy() {
    if (this.createSub) this.createSub.unsubscribe()
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
      this.newTodo = plainToClass(NewTodo,
        {
          text: this.createTodoform.value.todoTextFormControl,
          project_id: this.createTodoform.value.projectIdFormControl,
          project_title: this.createTodoform.value.projectTitleFormControl,
        })
      this.createSub = this.todosService.create(this.newTodo).subscribe(() => {
        this.hideModal.emit()
        this.onAddNewTodo.emit()
      }, () => this.hideModal.emit()
      )
    }
  }
}
