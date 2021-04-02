import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Projects} from './../../shared/interfaces';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.scss']
})
export class CreateTodoModalComponent implements OnInit {

  title = "Новая задача"
  @Input() projects: Projects[]
  @Output()
  hideModal = new EventEmitter<void>()
  createTodoform: FormGroup

  constructor () { }

  ngOnInit(): void {
    this.createTodoform = new FormGroup({
      todoTitleFormControl: new FormControl('', Validators.required),
      projectIdFormControl: new FormControl('', Validators.required),
      projectTitleFormControl: new FormControl('', Validators.required),
    })
  }




  submit() {
    console.log('form submitted:', this.createTodoform)
  }
}
