import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import { Task } from '../model/Task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // tasksSubject = new Subject<Task[]>();

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
    this.fillTasks();
  }

  getCategories(): Category[] {
    return TestData.categories;
  }

  getTasks(): Task[] {
    return TestData.tasks;
  }

  fillTasks(): void {
    // метод next оповещает подписчиков об изменении данных в TestData.tasks
    this.tasksSubject.next(TestData.tasks);
  }


  getTasksByCategory(category: Category): Task[] {
    const filledTasks = TestData.tasks.filter(task => task.category === category);
    console.log(filledTasks);
    return filledTasks;
  }

  fillTasksByCategory(category: Category): void {
    const filledTasks = TestData.tasks.filter(task => task.category === category);
    // метод next оповещает подписчиков об изменении данных в TestData.tasks
    this.tasksSubject.next(filledTasks);
  }

}
