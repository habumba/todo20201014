import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) { }

  // метод вызывается автоматически после инициализации компонента
  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories();
    console.log(this.categories);
    this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories);
  }

  showTasksByCategory(category: Category): void {
    this.selectedCategory = category;
     this.dataHandler.fillTasksByCategory(category);
    // this.dataHandler.fillTasks();
  }
}
