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
  constructor (private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsSub = this.projectsService.getAll().subscribe(projects => {
      this.projects = projects
      console.log(this.projects)
    })
  }

  ngOnDestroy() {
    if (this.projectsSub) this.projectsSub.unsubscribe()
  }


}
