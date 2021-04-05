import {Component, OnDestroy, OnInit} from '@angular/core';
import 'reflect-metadata';
import {ProjectsService} from './shared/projects.service';
import {Project} from './shared/interfaces';
import {Subscription} from 'rxjs';
import {TodosService} from './shared/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Задачи';
  projects: Project[] = []
  projectsSub: Subscription
  errorsSub: Subscription[] = []
  error: string

  constructor (
    private projectsService: ProjectsService,
    public todosService: TodosService,
    public projectService: ProjectsService
  ) { }

  modal = false

  ngOnInit(): void {
    this.drawProjectList()
    this.errorsHandle()
  }

  ngOnDestroy(): void {
    if (this.projectsSub) this.projectsSub.unsubscribe()
    if (this.errorsSub.length) {
      this.errorsSub.forEach(e => e.unsubscribe())
    }
  }

  drawProjectList(): void {
    this.projectsSub = this.projectsService.getAll().subscribe(projects => {
      this.projects = projects
    })
  }

  errorsHandle() {
    [this.todosService.error$,
    this.projectService.error$].forEach(error$ => {
      this.errorsSub.push(error$.subscribe(err => this.error = err))
    }
    )
  }
}
