import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlantillasService, Plantilla } from '../../services/plantillas.service';
import { MemesService } from '../../services/memes.service';
import { AuthService } from '../../services/auth.service';
import { ServiceStatusComponent } from '../service-status/service-status.component';

@Component({
  selector: 'app-generator',
  imports: [FormsModule, RouterLink, CommonModule, ServiceStatusComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent implements OnInit {
  selectedImage: string | null = null;
  selectedPlantillaId: number | null = null;
  topText: string = '';
  bottomText: string = '';
  descripcion: string = '';
  
  // Para subir plantillas
  nuevaPlantillaNombre: string = '';
  nuevaPlantillaDescripcion: string = '';
  nuevaPlantillaUrl: string = '';
  showUploadForm: boolean = false;
  
  plantillas: Plantilla[] = [];
  isLoading: boolean = false;
  isSaving: boolean = false;
  isUploadingPlantilla: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private plantillasService: PlantillasService,
    private memesService: MemesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlantillas();
  }

  loadPlantillas(): void {
    this.isLoading = true;
    this.plantillasService.findAll().subscribe({
      next: (plantillas) => {
        this.plantillas = plantillas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando plantillas:', error);
        this.isLoading = false;
      }
    });
  }

  selectTemplate(template: Plantilla): void {
    this.selectedImage = template.imagen;
    this.selectedPlantillaId = template.idPlantilla;
  }

  toggleUploadForm(): void {
    this.showUploadForm = !this.showUploadForm;
    if (!this.showUploadForm) {
      this.nuevaPlantillaNombre = '';
      this.nuevaPlantillaDescripcion = '';
      this.nuevaPlantillaUrl = '';
    }
  }

  uploadPlantilla(): void {
    if (!this.nuevaPlantillaNombre || !this.nuevaPlantillaUrl) {
      this.errorMessage = 'Por favor ingresa nombre y URL de la imagen';
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = 'Debes iniciar sesión para subir plantillas';
      this.router.navigate(['/login']);
      return;
    }

    this.isUploadingPlantilla = true;
    this.errorMessage = '';

    this.plantillasService.create({
      nombre: this.nuevaPlantillaNombre,
      descripcion: this.nuevaPlantillaDescripcion || undefined,
      imagen: this.nuevaPlantillaUrl,
      idUsuario: currentUser.idUsuario
    }).subscribe({
      next: (plantilla) => {
        this.plantillas.unshift(plantilla);
        this.isUploadingPlantilla = false;
        this.successMessage = '¡Plantilla subida exitosamente!';
        this.toggleUploadForm();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error subiendo plantilla:', error);
        this.isUploadingPlantilla = false;
        this.errorMessage = error.error?.message || 'Error al subir la plantilla';
      }
    });
  }

  saveMeme(): void {
    if (!this.selectedImage) {
      this.errorMessage = 'Por favor selecciona una plantilla';
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = 'Debes iniciar sesión para subir memes';
      this.router.navigate(['/login']);
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.memesService.create({
      descripcion: this.descripcion || `Meme creado por ${currentUser.nombre}`,
      superior: this.topText,
      inferior: this.bottomText,
      estado: 'publicado',
      imagen: this.selectedImage,
      idUsuario: currentUser.idUsuario,
      idPlantilla: this.selectedPlantillaId || undefined
    }).subscribe({
      next: () => {
        this.successMessage = '¡Meme subido exitosamente!';
        this.isSaving = false;
        // Limpiar el formulario
        this.cancel();
        // Redirigir al home después de 1.5 segundos
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error subiendo meme:', error);
        this.isSaving = false;
        this.errorMessage = error.error?.message || 'Error al subir el meme';
      }
    });
  }

  cancel(): void {
    this.selectedImage = null;
    this.selectedPlantillaId = null;
    this.topText = '';
    this.bottomText = '';
    this.descripcion = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre || '';
  }

  getCurrentUserInitial(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre?.charAt(0)?.toUpperCase() || '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
