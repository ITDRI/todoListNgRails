
import {Type} from 'class-transformer';
export interface Todo {
  id: number
  text: string
  isCompleted: boolean
  project_id: number
  project_title?: string
}
export interface Project {
  id: number
  title: string
  todos: Todos[]
}

export class Projects implements Project {
  id: number;
  title: string;
  @Type(() => Todos)
  todos: Todos[];
}

export class Todos implements Todo {
  id: number
  text: string
  isCompleted: boolean
  project_id: number
  project_title?: string
}

