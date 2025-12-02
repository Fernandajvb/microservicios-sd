import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-generator',
  imports: [FormsModule, RouterLink],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  selectedImage: string | null = null;
  topText: string = '';
  bottomText: string = '';
  isProcessing: boolean = false;

  constructor(private memeService: MemeService) {}

  templates = [
    {
      id: 1,
      url: 'https://0.academia-photos.com/7945796/14743690/15558269/s200_diego.aracena-pizarro.jpg',
      alt: 'Meme template 1',
    },
    {
      id: 2,
      url: 'https://i1.rgstatic.net/ii/profile.image/1086852362702854-1636137204547_Q512/Humberto-Urrutia-2.jpg',
      alt: 'Meme template 2',
    },
    {
      id: 3,
      url: 'https://investigadores.uta.cl/files-asset/6815014/10696614-1.jpg?w=160&f=jpg',
      alt: 'Meme template 3',
    },
    {
      id: 4,
      url: 'https://avatars.githubusercontent.com/u/88569177?v=4',
      alt: 'Meme template 4',
    },
    {
      id: 5,
      url: 'https://investigadores.uta.cl/files-asset/6815197/07717839-2.jpg/',
      alt: 'Meme template 5',
    },
  ];

  selectTemplate(template: any): void {
    this.selectedImage = template.url;
  }

  saveAndDownload(): void {
    if (!this.selectedImage) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecciona una imagen',
        text: 'Elige una plantilla antes de guardar',
        allowOutsideClick: false,
      });
      return;
    }

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user?.idUsuario) {
      Swal.fire({
        icon: 'error',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para guardar memes',
        allowOutsideClick: false,
      });
      return;
    }

    this.isProcessing = true;
    Swal.fire({
      title: 'Guardando y descargando...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    this.memeService
      .createMeme({
        idUsuario: user.idUsuario,
        selectedImage: this.selectedImage,
        imagen: this.selectedImage,
        topText: this.topText,
        bottomText: this.bottomText,
        superior: this.topText,
        inferior: this.bottomText,
        estado: 'publicado',
        idPlantilla: null,
      })
      .subscribe({
        next: async () => {
          await this.generateAndDownloadImage();
          Swal.fire({
            icon: 'success',
            title: 'Meme guardado',
            text: 'Tu meme se guardó y se descargará ahora',
            allowOutsideClick: false,
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo guardar',
            text:
              err?.error?.message ??
              'Ocurrió un error al guardar el meme. Intenta más tarde.',
            allowOutsideClick: false,
          });
          console.error('Error al guardar meme', err);
        },
        complete: () => {
          this.isProcessing = false;
        },
      });
  }

  downloadOnly(): void {
    if (!this.selectedImage) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecciona una imagen',
        text: 'Elige una plantilla antes de descargar',
        allowOutsideClick: false,
      });
      return;
    }
    this.generateAndDownloadImage();
  }

  cancel(): void {
    this.selectedImage = null;
    this.topText = '';
    this.bottomText = '';
  }

  private async generateAndDownloadImage(): Promise<void> {
    if (!this.selectedImage) return;
    try {
      const dataUrl = await this.fetchImageAsDataUrl(this.selectedImage);

      const img = new Image();
      img.src = dataUrl;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
      });

      const canvas = document.createElement('canvas');
      const targetWidth = 800;
      const targetHeight = 800;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo crear el contexto de canvas');

      // Fondo negro
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Dibujar imagen con "contain"
      const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (targetWidth - drawWidth) / 2;
      const dy = (targetHeight - drawHeight) / 2;
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

      const drawWrappedText = (
        text: string,
        centerY: number,
        fromTop: boolean,
      ) => {
        const maxWidth = canvas.width * 0.9;
        let fontSize = Math.max(32, canvas.width / 12);

        const setFont = () => {
          ctx.font = `${fontSize}px Impact, Arial, sans-serif`;
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = Math.max(4, canvas.width / 200);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
        };

        // Reduce font size until lines fit
        const words = text.split(' ');
        let lines: string[] = [];
        const buildLines = () => {
          lines = [];
          let current = '';
          for (const word of words) {
            const test = current ? `${current} ${word}` : word;
            if (ctx.measureText(test).width > maxWidth && current) {
              lines.push(current);
              current = word;
            } else {
              current = test;
            }
          }
          if (current) lines.push(current);
        };

        setFont();
        buildLines();
        while (
          lines.some((line) => ctx.measureText(line).width > maxWidth) &&
          fontSize > 16
        ) {
          fontSize -= 2;
          setFont();
          buildLines();
        }

        const lineHeight = fontSize * 1.1;
        const totalHeight = lines.length * lineHeight;
        let startY = centerY;
        if (!fromTop) {
          startY = centerY - totalHeight + lineHeight;
        }

        lines.forEach((line, idx) => {
          const y = fromTop ? startY + idx * lineHeight : startY + idx * lineHeight;
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      };

      if (this.topText) {
        drawWrappedText(this.topText, canvas.height * 0.1, true);
      }
      if (this.bottomText) {
        drawWrappedText(this.bottomText, canvas.height * 0.9, false);
      }

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'meme.png';
      link.click();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al descargar',
        text:
          'No se pudo generar la imagen para descargar. Usa plantillas con CORS abierto o intenta con otra URL.',
      });
      console.error('Error generando imagen', error);
    }
  }

  private async fetchImageAsDataUrl(url: string): Promise<string> {
    // Se usa un proxy en el backend para evitar problemas de CORS al descargar la plantilla
    const blob = await this.memeService
      .fetchImageBlob(url)
      .toPromise()
      .then((b) => b as Blob);
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
