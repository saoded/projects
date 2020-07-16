import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //todosUrl: string = 'http://jasonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    //return this.http.get<Todo[]>(this.todosUrl);
    return new Observable((observer) => {
      observer.next([
        new Todo(1, "one", true),
        new Todo(),
        new Todo(2, 'Naomi Jo', false)
      ]);
      observer.complete();
    });
  }

  /*toggleCompleted(todo: Todo) :Observable<any>{
    return this.http.put(url, todo, httpOptions);
  }*/
  /*deleteTodo(todo: Todo): Observable<Todo>{
    this.http.delete<Todo>(url, httpOptions);
  }*/
  AddTodo(todo: Todo)/*: Observable<Todo>*/ {
    //return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
