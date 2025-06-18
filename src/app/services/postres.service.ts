import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PostreRequest, PostreResponse } from '../models/postres/Postres';

@Injectable({
  providedIn: 'root'
})
export class PostresService {
  private apiUrl = 'https://spring-boot-imyt-tweeter-postres.onrender.com/'; // URL del backend para crear el postre

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Usar el token almacenado
      'Content-Type': 'application/json'
    });
  }

  // Método para crear un postre
  createPostre(postreRequest: PostreRequest): Observable<PostreResponse> {
    return this.http.post<PostreResponse>(`${this.apiUrl}create`, postreRequest, {
      headers: this.getAuthHeaders()  // Usar las cabeceras con el token
    }).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Manejo de errores
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}