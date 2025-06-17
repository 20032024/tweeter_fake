import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de que Router está importado
import { StorageService } from "../services/storage.service";
import { TweetService } from '../services/tweet.service';
import { TweetReactionsService } from '../services/tweet-reactions.service';
import { CategoryService } from '../services/category.service';

import { Tweet } from '../models/tweets/Tweet';
import { Category } from '../models/category/Category';
import { TweetReaction } from '../models/tweets/tweet-reaction';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = "";
  tweetText: string = '';
  selectedCategory: Category = new Category();
  tweetNamePostre: string = '';
  tweetIngredientes: string = '';
  tweetTipoPostre: string = '';
  categories: Category[] = [];
  tweets: Tweet[] = [];
  menuAbierto = false; // Aquí se gestiona el estado del menú

  reactionsByTweet: { [tweetId: number]: TweetReaction[] } = {};
  newCommentContent: { [tweetId: number]: string } = {}; // Comentarios por tweetId


  constructor(
    private storageService: StorageService,
    private tweetService: TweetService,
    private tweetReactionService: TweetReactionsService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.username = this.storageService.getSession("user");
    console.log(this.username);
    this.getTweets();
    this.getCategories();
  }

  // Añadir un tweet
  addTweet() {
    const newTweet: Tweet = {
      id: 0,
      tweet: this.tweetText,
      ingredientes: this.tweetIngredientes,
      namePostre: this.tweetNamePostre,
      tipoPostre: this.tweetTipoPostre,
      categoria: this.selectedCategory,
    };

    this.tweetService.postTweet(newTweet).subscribe((response: any) => {
      this.getTweets();
      this.tweetText = '';
      this.tweetIngredientes = '';
      this.tweetNamePostre = '';
      this.tweetTipoPostre = '';
      this.selectedCategory = new Category();
    });
  }

  // Obtener los tweets
  private getTweets() {
    this.tweetService.getTweets().subscribe((tweets: any) => {
      this.tweets = tweets.content;
      console.log(this.tweets);
    });
  }

  // Obtener las categorías
  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }


  crearComentario(tweet: Tweet) {
    if (!tweet.nuevoComment || tweet.nuevoComment.trim() === '') return;

    const comentario = {
      content: tweet.nuevoComment, // ✅ nombre exacto del backend
      tweetId: tweet.id            // ✅ id del tweet
    };

    this.tweetService.postCommenter(comentario).subscribe({
      next: () => {
        tweet.nuevoComment = '';
        this.cargarComentarios(tweet);
      },
      error: (err: any) => {
        console.error('Error al crear comentario:', err);
      }
    });
  }
  cargarComentarios(tweet: Tweet) {
    this.tweetService.getComentariosPorTweet(tweet.id).subscribe({
      next: (comentarios: { id: number; content: string; user: { username: string }; fechaCreacion: string }[] | undefined) => {
        console.log("Comentarios cargados: ", comentarios);
        tweet.comentarios = comentarios;
      },
      error: (err: any) => {
        console.error(`Error al cargar comentarios para el tweet ${tweet.id}`, err);
      }
    });
  }


  // Método para navegar a Categorías
  goToCategories() {
    this.router.navigate(['/pagina-principal/categorias']);  // Navegar a la ruta de categorías
  }

  // Método para alternar el estado del menú
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;  // Alternar entre abierto y cerrado
  }

  cerrarMenu() {
    this.menuAbierto = false; // Cerrar el menú manualmente
  }

  // Obtener las reacciones
  private getReactions() {
    this.tweetReactionService.getAllReactions().subscribe(data => {
      const reactions = data;
      this.reactionsByTweet = {};
      for (let reaction of reactions) {
        const tweetId = reaction.tweetId;
        if (!this.reactionsByTweet[tweetId]) {
          this.reactionsByTweet[tweetId] = [];
        }
        this.reactionsByTweet[tweetId].push(reaction);
      }
      console.log("Reacciones agrupadas por tweet:", this.reactionsByTweet);
    });
  }
  addReaction(tweetId: number, reactionId: number) {
    const userId = Number(this.storageService.getSession("userId"));

    if (!userId) {
      console.error("Usuario no autenticado");
      return;
    }

    const newReaction = {
      userId: userId,
      tweetId: tweetId,
      reactionId: reactionId
    };

    // Llamar al servicio para crear la nueva reacción
    this.tweetReactionService.createReaction(newReaction).subscribe({
      next: (response) => {
        console.log("Reacción creada:", response);
        this.getReactions(); // refresca las reacciones
      },
      error: (error) => {
        console.error("Error al crear reacción:", error);
      }
    });
  }
}