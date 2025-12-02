import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Registrando...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .pipe(finalize(() => Swal.close()))
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Ahora puedes iniciar sesión',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => this.router.navigate(['/login']));
        },
        error: (err) => {
          const message =
            err?.error?.message ??
            (err?.status === 409
              ? 'El correo o usuario ya está registrado'
              : 'Ocurrió un error al registrar');
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: message,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          console.error('Error de registro', err);
        },
      });
  }
}
