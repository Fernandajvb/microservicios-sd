import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Creador {
  idUsuario: number;
  nombre: string;
  username: string;
}

export interface PlantillaMeme {
  idPlantilla: number;
  nombre: string;
  imagen: string;
}

export interface Meme {
  idMeme: number;
  descripcion?: string;
  superior?: string;
  inferior?: string;
  estado?: string;
  fecha: string;
  imagen?: string;
  idUsuario: number;
  idPlantilla?: number;
  creador?: Creador;
  plantilla?: PlantillaMeme;
  reacciones?: any[];
}

export interface CreateMemeData {
  descripcion?: string;
  superior?: string;
  inferior?: string;
  estado?: string;
  imagen?: string;
  idUsuario: number;
  idPlantilla?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MemesService {
  private readonly API_URL = 'http://localhost:3000/api/memes';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los memes
   */
  findAll(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.API_URL);
  }

  /**
   * Obtiene un meme por ID
   */
  findOne(id: number): Observable<Meme> {
    return this.http.get<Meme>(`${this.API_URL}/${id}`);
  }

  /**
   * Obtiene los memes de un usuario
   */
  findByUser(idUsuario: number): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.API_URL}/user/${idUsuario}`);
  }

  /**
   * Crea un nuevo meme
   */
  create(data: CreateMemeData): Observable<Meme> {
    return this.http.post<Meme>(this.API_URL, data);
  }

  /**
   * Actualiza un meme
   */
  update(id: number, data: Partial<CreateMemeData>): Observable<Meme> {
    return this.http.put<Meme>(`${this.API_URL}/${id}`, data);
  }

  /**
   * Elimina un meme
   */
  delete(id: number): Observable<Meme> {
    return this.http.delete<Meme>(`${this.API_URL}/${id}`);
  }

  /**
   * Toggle like en un meme
   */
  toggleLike(idMeme: number, idUsuario: number): Observable<{ liked: boolean; totalLikes: number }> {
    return this.http.post<{ liked: boolean; totalLikes: number }>(
      `${this.API_URL}/${idMeme}/like`,
      { idUsuario }
    );
  }

  /**
   * Verificar si un usuario dio like a un meme
   */
  hasUserLiked(idMeme: number, idUsuario: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/${idMeme}/liked/${idUsuario}`);
  }

  /**
   * Obtener IDs de memes que le gustan al usuario
   */
  getUserLikes(idUsuario: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.API_URL}/likes/${idUsuario}`);
  }
}
