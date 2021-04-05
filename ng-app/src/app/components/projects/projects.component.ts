import {Component, Input, OnInit} from '@angular/core';
import {Project} from './../../shared/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input()
  project: Project

  constructor () { }

  ngOnInit(): void {
  }

  markComplete(event, id) {
    this.project
    console.log(event, id)
  }
}
