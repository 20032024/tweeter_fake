import { Category } from "../category/Category";

export class Tweet {
  id: number = 0;
  tweet: string = "";
  ingredientes: string = "";
  namePostre: string = "";
  tipoPostre: string = "";
  categoria: Category = new Category();  // Aquí agregamos la referencia a Category
  comentarios?: { id: number; content: string; user: { username: string }; fechaCreacion: string }[] = [];
  nuevoComment?: string = '';

  constructor(
    id: number,
    tweet: string,
    ingredientes: string,
    namePostre: string,
    tipoPostre: string,
    categoria: Category
  ) {
    this.id = id;
    this.tweet = tweet;
    this.ingredientes = ingredientes;
    this.namePostre = namePostre;
    this.tipoPostre = tipoPostre;
    this.categoria = categoria;
    this.comentarios = [];
    this.nuevoComment = '';
  }
}