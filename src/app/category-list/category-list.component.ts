import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';  // Asegúrate de importar el servicio
import { Category } from '../models/category/Category';  // Asegúrate de importar el modelo Category

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];  // Inicializa la lista de categorías
  selectedCategory: string = '';  // Variable para almacenar la categoría seleccionada

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();  // Cargar categorías al inicializar el componente
  }

  loadCategories(): void {
    this.categoryService.getCategoriesWithImages().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);  // Muestra las categorías en la consola
      },
      (error) => {
        console.log("Error al cargar categorías:", error);
      }
    );
  }

  // Método que se ejecuta cuando se hace clic en una categoría
  showCategoryTitle(categoryName: string): void {
    this.selectedCategory = categoryName;
  }
}