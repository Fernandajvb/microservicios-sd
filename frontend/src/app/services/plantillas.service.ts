import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Creador {
  idUsuario: number;
  nombre: string;
  username: string;
}

export interface Plantilla {
  idPlantilla: number;
  nombre: string;
  descripcion?: string;
  imagen: string;
  fecha: string;
  idUsuario: number;
  creador?: Creador;
  _count?: {
    memes: number;
  };
}

export interface CreatePlantillaData {
  nombre: string;
  descripcion?: string;
  imagen: string;
  idUsuario: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {
  private readonly API_URL = 'http://localhost:3000/api/plantillas';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las plantillas
   */
  findAll(): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(this.API_URL);
  }

  /**
   * Obtiene una plantilla por ID
   */
  findOne(id: number): Observable<Plantilla> {
    return this.http.get<Plantilla>(`${this.API_URL}/${id}`);
  }

  /**
   * Obtiene las plantillas de un usuario
   */
  findByUser(idUsuario: number): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(`${this.API_URL}/user/${idUsuario}`);
  }

  /**
   * Crea una nueva plantilla
   */
  create(data: CreatePlantillaData): Observable<Plantilla> {
    return this.http.post<Plantilla>(this.API_URL, data);
  }

  /**
   * Actualiza una plantilla
   */
  update(id: number, data: Partial<CreatePlantillaData>): Observable<Plantilla> {
    return this.http.put<Plantilla>(`${this.API_URL}/${id}`, data);
  }

  /**
   * Elimina una plantilla
   */
  delete(id: number): Observable<Plantilla> {
    return this.http.delete<Plantilla>(`${this.API_URL}/${id}`);
  }
}

