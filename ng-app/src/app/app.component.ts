import {Component, OnDestroy, OnInit} from '@angular/core';
import 'reflect-metadata';
import {ProjectsService} from './shared/projects.service';
import {Projects} from './shared/interfaces';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Задачи';
  projects: Projects[] = []
  projectsSub: Subscription
  errSub: Subscription
  error: HttpErrorResponse
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

  errorsHandle(error: HttpErrorResponse) {
    this.error = error
  }

  projectsTrack(_, project: Projects) {
    return project.id;
  }
}
