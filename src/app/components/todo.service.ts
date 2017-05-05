import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/timer';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  todos: Todo[];

  constructor() {
    this.todos = [];
  }

  getTodos(): Observable<Todo[]> {
    const timer = 1000;
    const todos = JSON.parse(localStorage.getItem('todo') || '[]');

    this.todos = todos.length ?
      todos.map((todo: { text: string, completed: boolean }) => new Todo(todo.text, todo.completed)) : todos;

    return Observable.timer(timer).mapTo(this.todos);
  }

  add(text: string): void {
    this.todos.push(new Todo(text));
    this.updateStorage();
  }

  toggleDone(todo: Todo): void {
    todo.completed = !todo.completed;
    this.updateStorage();
  }

  remove(removingTodo: Todo): void {
    this.todos = this.todos.filter((todo, index) => todo !== removingTodo);
    this.updateStorage();
  }

  getItemsLeft(): Todo[] {
    return this.todos.filter((todo, index) => !todo.completed);
  }

  getItemsDone(): Todo[] {
    return this.todos.filter((todo, index) => todo.completed);
  }

  private updateStorage(): void {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }
}
