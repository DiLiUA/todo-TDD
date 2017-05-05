import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'sg-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  filter: string;

  constructor(private todoService: TodoService) {
    this.filter = 'All';
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(form): void {
    const text = form.value.todo;

    if (!text) {
      return;
    }

    this.todoService.add(text);
    form.reset();

    if (this.filter !== 'All') {
      this.changeFilter(this.filter);
    }
  }

  toggleDone(todo: Todo): void {
    this.todoService.toggleDone(todo);
  }

  removeTodo(todo: Todo): void {
    this.todoService.remove(todo);
    this.getTodos();
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
