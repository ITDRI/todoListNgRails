import {Type} from 'class-transformer';
export interface NewTodo {
  text: string
  project_id: number
  isCompleted: boolean
  project_title?: string
}
export class Projects {
  id: number;
  title: string;
  @Type(() => Todo)
  todos: Todo[];
}

export class Todo {
  id: number
  text: string
  isCompleted: boolean
  project_id: number
  project_title?: string
}


