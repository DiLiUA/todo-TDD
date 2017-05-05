import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo.component';
import { TodoService } from './components/todo.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoComponent
      ],
      providers: [TodoService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
