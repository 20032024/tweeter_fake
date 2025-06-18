import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StorageService } from "../services/storage.service";
import { TweetReaction } from '../models/tweets/tweet-reaction';

@Injectable({
  providedIn: 'root'
})
export class TweetReactionsService {
  apiURL = 'https://spring-boot-imyt-tweeter-postres.onrender.com/';
  token: string = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService) {
    this.token = this.storageService.getSession("token");
    console.log("mi token", this.token);
    if (!this.token) {
      console.error('Token no disponible');
    }
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.token
    })
  }


  errorMessage = '';
  getHttpOptions() {
    const token = this.storageService.getSession('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

  }

  getAllReactions(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}api/reactions/all`, this.getHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  createTweetReaction(tweetReaction: {
    userId: number;
    tweetId: number;
    reactionId: number;
  }): Observable<TweetReaction> {
    return this.http.post<TweetReaction>(`${this.apiURL}api/reactions/create`, tweetReaction, this.getHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }



  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    window.alert(errorMessage);
    return throwError(errorMessage);
  }



}