import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = 'http://localhost:8080/api/comments'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient, private storageService: StorageService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


}