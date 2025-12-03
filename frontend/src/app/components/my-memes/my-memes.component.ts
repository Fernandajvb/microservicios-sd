import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, Usuario } from '../../services/auth.service';
import { MemesService, Meme } from '../../services/memes.service';
import { ServiceStatusComponent } from '../service-status/service-status.component';

@Component({
  selector: 'app-my-memes',
  imports: [RouterLink, CommonModule, ServiceStatusComponent],
  templateUrl: './my-memes.component.html',
  styleUrl: './my-memes.component.css'
})
export class MyMemesComponent implements OnInit {
  currentUser: Usuario | null = null;
  memes: Meme[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  userLikes: Set<number> = new Set();

  constructor(
    private authService: AuthService,
    private memesService: MemesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadMyMemes();
  }

  loadMyMemes(): void {
    if (!this.currentUser) return;

    this.isLoading = true;
    this.memesService.findByUser(this.currentUser.idUsuario).subscribe({
      next: (memes) => {
        this.memes = memes;
        this.isLoading = false;
        this.loadUserLikes();
      },
      error: (error) => {
        console.error('Error cargando mis memes:', error);
        this.isLoading = false;
        this.errorMessage = 'Error al cargar tus memes';
      }
    });
  }

  loadUserLikes(): void {
    if (!this.currentUser) return;
    
    this.memesService.getUserLikes(this.currentUser.idUsuario).subscribe({
      next: (likedMemeIds) => {
        this.userLikes = new Set(likedMemeIds);
      },
      error: (error) => {
        console.error('Error cargando likes:', error);
      }
    });
  }

  toggleLike(meme: Meme): void {
    if (!this.currentUser) return;

    this.memesService.toggleLike(meme.idMeme, this.currentUser.idUsuario).subscribe({
      next: (result) => {
        if (result.liked) {
          this.userLikes.add(meme.idMeme);
        } else {
          this.userLikes.delete(meme.idMeme);
        }
        
        const memeIndex = this.memes.findIndex(m => m.idMeme === meme.idMeme);
        if (memeIndex !== -1) {
          this.memes[memeIndex] = {
            ...this.memes[memeIndex],
            reacciones: Array(result.totalLikes).fill({})
          };
        }
      },
      error: (error) => {
        console.error('Error al dar like:', error);
      }
    });
  }

  isLiked(meme: Meme): boolean {
    return this.userLikes.has(meme.idMeme);
  }

  deleteMeme(meme: Meme): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este meme?')) {
      return;
    }

    this.memesService.delete(meme.idMeme).subscribe({
      next: () => {
        this.memes = this.memes.filter(m => m.idMeme !== meme.idMeme);
      },
      error: (error) => {
        console.error('Error eliminando meme:', error);
        this.errorMessage = 'Error al eliminar el meme';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getInitial(nombre: string | undefined): string {
    return nombre?.charAt(0)?.toUpperCase() || '?';
  }

  formatDate(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  getTotalLikes(): number {
    return this.memes.reduce((total, meme) => total + (meme.reacciones?.length || 0), 0);
  }

  getLatestMemeDate(): string {
    if (this.memes.length === 0) return '-';
    const latest = this.memes[0]; // Ya están ordenados por fecha desc
    return new Date(latest.fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  }
}

