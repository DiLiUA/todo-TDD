export class Todo {
  text: string;
  completed: boolean;

  constructor(text: string, completed = false) {
    this.text = text;
    this.completed = completed;
  }
}
