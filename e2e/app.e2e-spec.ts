import { TodoTDDPage } from './app.po';

describe('todo-tdd App', () => {
  let page: TodoTDDPage;

  beforeEach(() => {
    page = new TodoTDDPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
