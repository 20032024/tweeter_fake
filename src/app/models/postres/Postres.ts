export class PostreRequest {
  name: string = '';
  description: string = '';
  categoryId: number = 0;
}


export class PostreResponse {
  id: number = 0;           // ID del postre creado
  name: string = '';        // Nombre del postre
  description: string = ''; // Descripción del postre
  categoryId: number = 0;   // ID de la categoría asociada al postre

  // Constructor opcional para inicializar el objeto si lo prefieres
  constructor(id: number, name: string, description: string, categoryId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;
  }
}


// src/app/models/postres/Postre.ts
export class Postre {
  id: number = 0;
  name: string = '';
  description: string = '';
  categoryId: number = 0;
  categoryName: string = '';  // Opcional, puedes incluir el nombre de la categoría si es necesario

  constructor(id: number = 0, name: string = '', description: string = '', categoryId: number = 0) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;
  }
}