import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export interface Todo {
  id: number
  title: string
  completed: boolean
  date?: any
}

@Injectable({providedIn: 'root'})
export class TodosService {
  public todos: Todo[] = []

  constructor(private http: HttpClient) {
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .pipe(tap(todos => this.todos = todos))
  }

  onToggle(id: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }
}
