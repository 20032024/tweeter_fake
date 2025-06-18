import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de que Router está importado
import { StorageService } from "../services/storage.service";
import { TweetService } from '../services/tweet.service';
import { CategoryService } from '../services/category.service';
import { CommentsService } from '../services/comments.service';
import { TweetReactionsService } from '../services/tweet-reactions.service';


import { Tweet } from '../models/tweets/Tweet';
import { Category } from '../models/category/Category';
import { TweetReaction } from '../models/tweets/tweet-reaction';
import { TweetComment } from '../models/comments/TweetComment';


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
  commentsByTweet: { [tweetId: number]: TweetComment[] } = {};
  newCommentContent: { [tweetId: number]: string } = {};


  constructor(
    private storageService: StorageService,
    private tweetService: TweetService,
    private tweetReactionService: TweetReactionsService,
    private categoryService: CategoryService,
    private router: Router,
    private commentsService: CommentsService
  ) {
    this.username = this.storageService.getSession("user");
    console.log(this.username);
    this.getTweets();
    this.getCategories();
  }
  // Obtener las categorías
  getCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }


  private getReactions() {
    this.tweetReactionService.getAllReactions().subscribe(data => {
      const reactions = data.content || data;
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

  // Obtener los tweets
  private getTweets() {
    this.tweetService.getTweets().subscribe((tweets: any) => {
      this.tweets = tweets.content;
      console.log(this.tweets);
      this.tweets.forEach((tweet: Tweet) => {
        this.getComments(tweet.id);
      });
    });
  }

  getComments(tweetId: number): void {

    this.commentsService.getCommentsByTweet(tweetId).subscribe({
      next: (comments) => {
        this.commentsByTweet[tweetId] = comments;
      },
      error: (err) => {
        console.error("Error al obtener los comentarios:", err);
      }


    });
  }


  createComment(tweetId: number) {
    const userId = Number(this.storageService.getSession("userId"));

    if (!userId) {
      console.error("Usuario no autenticado");
      return;
    }


    if (!this.newCommentContent[tweetId]?.trim()) {
      console.warn("Comentario vacío");
      return;
    }

    const newComment = {
      tweetId: tweetId,
      content: this.newCommentContent[tweetId],
      fechaCreacion: new Date().toISOString() // Fecha en formato ISO
    };

    this.commentsService.createComment(newComment).subscribe({
      next: (createdComment) => {
        console.log("Comentario creado:", createdComment);

        if (!this.commentsByTweet[tweetId]) {
          this.commentsByTweet[tweetId] = [];
        }
        this.commentsByTweet[tweetId].push(createdComment);


        this.newCommentContent[tweetId] = '';
      },
      error: (error) => {
        console.error("Error al crear comentario:", error);
      }
    });
  }

  // Obtener las reacciones
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

    this.tweetReactionService.createTweetReaction(newReaction).subscribe({
      next: (response) => {
        console.log("Reacción creada:", response);
        this.getReactions(); // refresca reacciones
      },
      error: (error) => {
        console.error("Error al crear reacción:", error);
      }
    });
  }


  // Añadir un tweet
  addTweet() {
    const newTweet: Tweet = {
      id: 0,
      tweet: this.tweetText,
      ingredientes: this.tweetIngredientes,
      namePostre: this.tweetNamePostre,
      tipoPostre: this.tweetTipoPostre,
      categoria: this.selectedCategory  // <--- manda el objeto completo
    };
    this.tweetService.postTweet(newTweet).subscribe((response: any) => {
      this.getTweets(); // Cargar los tweets después de crear uno nuevo
      this.resetTweetForm(); // Limpiar los campos del formulario
    });
  }

  resetTweetForm() {
    this.tweetText = '';
    this.tweetIngredientes = '';
    this.tweetNamePostre = '';
    this.tweetTipoPostre = '';
    this.selectedCategory = new Category(); // Restablecer la categoría seleccionada
  }

  getReactionCounts(tweetId: number): { [key: string]: number } {
    const counts: { [key: string]: number } = {};

    const reactions = this.reactionsByTweet[tweetId] || [];

    for (const reaction of reactions) {
      const description = reaction.reaction?.description || 'Desconocida';
      counts[description] = (counts[description] || 0) + 1;
    }

    return counts;
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
}