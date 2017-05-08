import {Component, OnInit} from '@angular/core';

import {TodoService} from './todo.service';
import {Todo} from './todo';

@Component({
  selector: 'sg-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  filter: string;
  textNewTodo: string;

  constructor(private todoService: TodoService) {
    this.filter = 'All';
    this.textNewTodo = '';
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(text: string): void {
    if (!text) {
      return;
    }

    this.todoService.add(text);
    this.changeFilter(this.filter);

    this.textNewTodo = '';
  }

  toggleDone(todo: Todo): void {
    this.todoService.toggleDone(todo);
    this.changeFilter(this.filter);
  }

  removeTodo(todo: Todo): void {
    this.todoService.remove(todo);
    this.changeFilter(this.filter);
  }

  getItemsLeft(): void {
    this.todos = this.todoService.getItemsLeft();
  }

  getItemsDone(): void {
    this.todos = this.todoService.getItemsDone();
  }

  changeFilter(filter: string): void {
    this.filter = filter;

    if (filter === 'Completed') {
      this.getItemsDone();
    } else if (filter === 'Active') {
      this.getItemsLeft();
    } else {
      this.getTodos();
    }
  }
}
