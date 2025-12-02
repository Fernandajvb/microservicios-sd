import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Iniciando sesión...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .pipe(finalize(() => Swal.close()))
      .subscribe({
        next: (res: any) => {
          if (res?.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          }
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => this.router.navigate(['/home']));
        },
        error: (err) => {
          const message =
            err?.error?.message ??
            (err?.status === 401
              ? 'Credenciales inválidas'
              : 'Ocurrió un error al iniciar sesión');
          Swal.fire({
            icon: 'error',
            title: 'No se pudo iniciar sesión',
            text: message,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          console.error('Error de login', err);
        },
      });
  }
}
