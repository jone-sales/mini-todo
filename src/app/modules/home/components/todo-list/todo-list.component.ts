import { Component, DoCheck } from '@angular/core';

//Interfaces
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(e: number) {
    this.taskList.splice(e, 1)
  }

  public setEmitTaskList(e: string) {
    this.taskList.push({task: e, checked: false})
  }

  public deleteAllTaskList() {
    const confirm = window.confirm("Are you sure??")

    if(confirm){
      this.taskList = [];
    }
  }

  public validationInput(e: string, i: number){
    if(!e.length){
      const confirm = window.confirm("Empty task, dou you want to delete it?")

      if(confirm) {
        this.deleteItemTaskList(i);
      }
    }
  }

  public setLocalStorage() {
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
    }

  }
}
