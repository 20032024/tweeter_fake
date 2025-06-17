import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category/Category';
import { catchError, retry, map } from 'rxjs/operators'; // Importa 'map' para usarlo
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories/'; // Asegúrate de que esta URL es la correcta

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Método para obtener las categorías con imágenes estáticas asignadas
  getCategoriesWithImages(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(categories => {
        return categories.map(category => {
          // Asigna una imagen estática a cada categoría según su nombre
          switch (category.name.toLowerCase()) {
            case 'postres de chocolate':
              category.imageUrl = '../../../category/postre-chocolate.jpg'; 
              break;
            case 'postres de limón':
              category.imageUrl = '../../../category/postre-limon.webp';
              break;
            case 'postres de fresa':
              category.imageUrl = '../../../category/postre-fresa.jpg';
              break;
            case 'postres de manzana':
              category.imageUrl = '../../../category/postre-manzana.jpg';
              break;
            default:
             // category.imageUrl = 'assets/default-category.jpg'; // Si no encuentra una categoría específica
          }
          return category;
        });
      })
    );
  }

  // Obtener todas las categorías sin imágenes
  getCategories(): Observable<Category[]> {
    console.log("Categories: " + this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      retry(1),
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Manejo de errores
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = error.error.message;
    } else {
      // Error del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}