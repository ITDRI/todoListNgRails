import {Component, OnDestroy, OnInit} from '@angular/core';
import 'reflect-metadata';
import {ProjectsService} from './shared/projects.service';
import {Project} from './shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Задачи';
  projects: Project[] = []
  projectsSub: Subscription
  errSub: Subscription
  error: string
  modal = false

  constructor (
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.drawProjectList()

    this.errSub = this.projectsService.error$.subscribe(err => {
      this.error = err
    })
  }

  ngOnDestroy(): void {
    if (this.projectsSub) this.projectsSub.unsubscribe()
  }

  drawProjectList(): void {
    this.projectsSub = this.projectsService.getAll().subscribe(projects => {
      this.projects = projects
    })
  }

  errorsHandle(error) {
    this.error = error
  }
}
