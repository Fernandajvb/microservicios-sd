import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MemeService {
  private readonly api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createMeme(payload: {
    idUsuario: number;
    imagen?: string;
    selectedImage?: string;
    topText?: string;
    bottomText?: string;
    superior?: string;
    inferior?: string;
    descripcion?: string;
    estado?: string;
    idPlantilla?: number | null;
  }) {
    return this.http.post(`${this.api}/memes/create`, payload);
  }

  getAllMemes() {
    return this.http.get<any[]>(`${this.api}/memes/all`);
  }

  fetchImageBlob(url: string) {
    return this.http.get(`${this.api}/memes/proxy`, {
      params: { url },
      responseType: 'blob',
    });
  }
}
