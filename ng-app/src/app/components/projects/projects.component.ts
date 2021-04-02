import {Component, Input, OnInit} from '@angular/core';
import {Project} from './../../shared/interfaces';
import {TodosService} from './../../shared/todos.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input()
  project: Project


  constructor (private TodosService: TodosService) { }

  ngOnInit(): void {
  }

  update(isCompleted, todo) {
    todo.isCompleted = isCompleted
    this.TodosService.update(todo).subscribe(res => console.log(res))

  }
}
