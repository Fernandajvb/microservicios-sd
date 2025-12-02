import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  activeTab: 'populares' | 'recientes' = 'populares';
  memes: any[] = [];
  fallbackImage =
    'https://placehold.co/400x500/111111/ffffff?text=Meme';

  constructor(private router: Router, private memeService: MemeService) {}

  ngOnInit(): void {
    this.loadMemes();
  }

  setActiveTab(tab: 'populares' | 'recientes'): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private loadMemes(): void {
    this.memeService.getAllMemes().subscribe({
      next: (data) => (this.memes = data),
      error: (err) => {
        console.error('No se pudieron cargar los memes', err);
        this.memes = [];
      },
    });
  }
}
