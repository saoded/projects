import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // delete in UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // remove from server
    // this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    /*this.todoService.AddTodo(todo).subscribe(todo =>{
      this.todos.push(todo);
    })*/
    this.todos.push(todo);
  }
}
