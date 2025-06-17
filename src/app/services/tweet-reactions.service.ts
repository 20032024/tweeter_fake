import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TweetReaction } from '../models/tweets/tweet-reaction'; // Usa la interfaz de TweetReaction

@Injectable({
  providedIn: 'root'
})
export class TweetReactionsService {

  private apiUrl = 'http://localhost:8080/api/reactions';  // Cambia esta URL si es necesario

  constructor(private http: HttpClient) { }

  // Método para crear una nueva reacción
  createReaction(tweetReaction: TweetReaction): Observable<TweetReaction> {
    const token = localStorage.getItem('token');  // Obtener el token desde el almacenamiento
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Incluir el token en las cabeceras
      })
    };

    return this.http.post<TweetReaction>(`${this.apiUrl}/create`, tweetReaction, httpOptions);
  }

  // Método para obtener todas las reacciones
  getAllReactions(): Observable<TweetReaction[]> {
    return this.http.get<TweetReaction[]>(`${this.apiUrl}/all`);
  }
}