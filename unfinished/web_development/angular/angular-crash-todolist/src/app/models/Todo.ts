export class Todo {
  id:number;
  title:string;
  completed:boolean;
  constructor(id=0, title="blank", completed=false){
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}
