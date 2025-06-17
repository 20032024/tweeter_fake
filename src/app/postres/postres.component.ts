import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category/Category'; 
import { PostreRequest } from '../models/postres/Postres';  // Ajusta la ruta
import { PostresService } from '../services/postres.service';  // Ajusta la ruta

@Component({
  selector: 'app-postres',
  templateUrl: './postres.component.html',
  styleUrls: ['./postres.component.css']
})
export class PostresComponent implements OnInit {

  postre: PostreRequest = new PostreRequest();  // Crea el modelo del postre
  categories: Category[] = [];  // Define correctamente el tipo de categories

  constructor(private categoryService: CategoryService, private postresService: PostresService) {}

  ngOnInit(): void {
    this.loadCategories();  
  }

  loadCategories(): void {
    this.categoryService.getCategoriesWithImages().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log("Error al cargar categorías:", error);
      }
    );
  }

  // Enviar los datos al backend
  createPostre(): void {
    this.postresService.createPostre(this.postre).subscribe(
      (response) => {
        console.log('Postre creado con éxito', response);
        // Redirigir o mostrar un mensaje de éxito
      },
      (error) => {
        console.error('Error al crear el postre', error);
      }
    );
  }
}