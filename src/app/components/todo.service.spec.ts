import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('Servise. Todo service', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService
      ]
    });
    service = TestBed.get(TodoService);
  });

  it('should get empty todos', fakeAsync(() => {
    const timer = 1000;
    let todos: Todo[];
    const expectedTodos: Todo[] = [];

    localStorage.clear();
    service = TestBed.get(TodoService);

    service.getTodos().subscribe((data: Todo[]) => {
      todos = data;
    });

    tick(timer);

    expect(todos).toEqual(expectedTodos);
  }));

  it('should get todos', fakeAsync(() => {
    const timer = 1000;
    let todos: Todo[];
    const todo = {text: 'test todo', completed: false};
    const expectedTodos: Todo[] = [new Todo(todo.text, todo.completed)];

    localStorage.setItem('todo', JSON.stringify([todo]));
    service = TestBed.get(TodoService);

    service.getTodos().subscribe((data: Todo[]) => {
      todos = data;
    });

    tick(timer);

    expect(todos).toEqual(expectedTodos);
    expect(todos[0] instanceof Todo).toEqual(true);
  }));

  it('should get new todo', () => {
    const text = 'test todo';
    const todos = [new Todo(text, false)];
    service.todos = [];

    service.add(text);

    expect(service.todos).toEqual(todos);
    expect(service.todos[0] instanceof Todo).toEqual(true);
    expect(service.todos.length).toBe(1);
  });

  it('should toggle done todo', () => {
    const todo = new Todo('test2', false);
    service.todos = [new Todo('test', true), todo];

    service.toggleDone(todo);

    expect(service.todos[1].completed).toBe(true);
  });

  it('should remove todo', () => {
    const todo = new Todo('test2', false);
    service.todos = [new Todo('test', true), todo];

    service.remove(todo);

    expect(service.todos.length).toBe(1);
    expect(service.todos.indexOf(todo) === -1).toBe(true);
  });

  it('should get left todos', () => {
    service.todos = [new Todo('test1', false), new Todo('test2', true), new Todo('test3', false)];
    const expectedLength = 2;
    const todos = service.getItemsLeft();

    expect(todos.length).toBe(expectedLength);
    expect(todos[0].completed).toBe(false);
    expect(todos[1].completed).toBe(false);
  });

  it('should get done todos', () => {
    service.todos = [new Todo('test1', true), new Todo('test2', false), new Todo('test3', true)];
    const expectedLength = 2;
    const todos = service.getItemsDone();

    expect(todos.length).toBe(expectedLength);
    expect(todos[0].completed).toBe(true);
    expect(todos[1].completed).toBe(true);
  });

});
