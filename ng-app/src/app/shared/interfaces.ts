import {Type} from 'class-transformer';
export interface Todo {
  id: number
  text: string
  isCompleted: boolean
  project_id: number
}
export interface Project {
  id: number
  title: string
  todos: Todos[]
}
export interface apiCreateTodo {
  text: string
  project_id: number
  isCompleted: boolean
  project_title?: string
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
  set complete(boo) {
    this.isCompleted = boo
  }

  project_id: number
  project_title?: string
}

export class NewTodo implements apiCreateTodo {
  text: string
  project_id: number
  get isCompleted(): boolean {
    return false
  }
  project_title?: string
}

