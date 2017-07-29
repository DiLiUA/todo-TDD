import { ComponentFixture, fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('Component. TodoComponent', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let context: TodoComponent;
  let compiled;
  let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent
      ],
      providers: [TodoService],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    context = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    service = TestBed.get(TodoService);
  });

  it('should get todos empty array', fakeAsync(() => {
    const timer = 1000;
    localStorage.clear();

    fixture.detectChanges();
    tick(timer);

    expect(context.todos).toEqual([]);
  }));

  it('should check todos', fakeAsync(() => {
    const timer = 1000;
    const todo = {text: 'test todo', completed: false};
    localStorage.setItem('todo', JSON.stringify([todo]));

    context.getTodos();
    tick(timer);

    expect(context.todos).toEqual([new Todo(todo.text, todo.completed)]);
  }));

  it('should not add todo if provided text is empty', fakeAsync(() => {
    const timer = 1000;
    const text  = '';

    context.todos = [];

    context.addTodo(text);
    tick(timer);

    expect(context.todos.length).toEqual(0);
  }));

  it('should add new todo', fakeAsync(() => {
    const timer = 1000;
    const text = 'test todo';
    context.todos = [];

    fixture.detectChanges();

    context.addTodo(text);
    tick(timer);

    expect(context.todos[0]).toEqual(new Todo(text));
  }));

  it('should add new todo and filtering', fakeAsync(() => {
    const timer = 1000;
    const text = 'test todo';
    context.todos = [];

    fixture.detectChanges();

    context.addTodo(text);
    tick(timer);

    expect(context.todos[0]).toEqual(new Todo(text));
  }));

  it('should toggle done todo', () => {
    const todo = new Todo('test');
    context.todos = [todo];

    context.toggleDone(todo);

    expect(context.todos[0].completed).toBe(true);
  });

  it('should remove todo', fakeAsync(() => {
    const timer = 1000;
    const todo = new Todo('test', false);
    context.todos = [todo];

    context.removeTodo(todo);
    tick(timer);

    expect(context.todos).toEqual([]);
  }));

  it('should get left todos', () => {
    service.todos = [new Todo('test1'), new Todo('test2', true)];

    context.getItemsLeft();

    expect(context.todos.length).toBe(1);
    expect(context.todos[0].completed).toBe(false);
  });

  it('should get done todos', () => {
    service.todos = [new Todo('test1'), new Todo('test2', true)];

    context.getItemsDone();

    expect(context.todos.length).toBe(1);
    expect(context.todos[0].completed).toBe(true);
  });

  it('should change filter to value All ', fakeAsync(() => {
    const timer = 1000;
    const nextFilter = 'All';
    const todosLength = 2;
    context.filter = 'Active';
    localStorage.setItem('todo', JSON.stringify([{text: 'test1', completed: false}, {text: 'test2', completed: true}]));

    context.changeFilter(nextFilter);
    tick(timer);

    expect(context.filter).toEqual(nextFilter);
    expect(context.todos.length).toBe(todosLength);
  }));

  it('should change filter to value Active ', () => {
    const nextFilter = 'Active';
    const todosLength = 1;
    service.todos = [new Todo('test1'), new Todo('test2', true)];
    localStorage.setItem('todo', JSON.stringify([{text: 'test1', completed: false}, {text: 'test2', completed: true}]));

    context.changeFilter(nextFilter);

    expect(context.filter).toEqual(nextFilter);
    expect(context.todos.length).toBe(todosLength);
  });

  it('should change filter to value Completed ', () => {
    const nextFilter = 'Completed';
    const todosLength = 1;
    service.todos = [new Todo('test1'), new Todo('test2', true)];
    localStorage.setItem('todo', JSON.stringify([{text: 'test1', completed: false}, {text: 'test2', completed: true}]));

    context.changeFilter(nextFilter);

    expect(context.filter).toEqual(nextFilter);
    expect(context.todos.length).toBe(todosLength);
  });

});
