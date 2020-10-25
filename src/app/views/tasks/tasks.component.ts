import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  // public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public displayedColumns: ReadonlyArray<string> = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы
  // public dataSource = new MatTableDataSource<Task>([]);

  public tasks: Task[];
  // tslint:disable-next-line:new-parens
  // public dataSource = new MatTableDataSource<Task>([new Task(9, 'Зам', true), new Task(8, 'Пере', false)]);
  // public tTasksSubject: Subject<Task[]>;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // метод subscribe получает обновленные tasks и помещает их в this.tasks
    // т.е. после выполнения метода subscribe в this.tasks содержатся новые данные
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);

    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();

    this.refreshTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  private getPriorityColor(task: Task): string {

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private refreshTable(): void {

     this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
  }
}
