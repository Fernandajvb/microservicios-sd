import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService, HealthStatus } from '../../services/health.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Indicador compacto -->
      <button 
        (click)="togglePanel()"
        class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
        [ngClass]="{
          'bg-green-500/20 text-green-400 hover:bg-green-500/30': !isUsingMirror && isOnline,
          'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 animate-pulse': isUsingMirror,
          'bg-red-500/20 text-red-400 hover:bg-red-500/30': !isOnline
        }">
        <span class="relative flex h-2 w-2">
          <span 
            class="absolute inline-flex h-full w-full rounded-full opacity-75"
            [ngClass]="{
              'bg-green-400': !isUsingMirror && isOnline,
              'bg-yellow-400 animate-ping': isUsingMirror,
              'bg-red-400': !isOnline
            }"></span>
          <span 
            class="relative inline-flex rounded-full h-2 w-2"
            [ngClass]="{
              'bg-green-500': !isUsingMirror && isOnline,
              'bg-yellow-500': isUsingMirror,
              'bg-red-500': !isOnline
            }"></span>
        </span>
        <span class="hidden sm:inline">
          {{ isUsingMirror ? 'Mirror' : (isOnline ? 'Online' : 'Offline') }}
        </span>
      </button>

      <!-- Panel desplegable -->
      <div 
        *ngIf="showPanel"
        class="absolute right-0 top-full mt-2 w-72 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
        
        <!-- Header del panel -->
        <div class="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <span class="text-white font-medium text-sm">Estado de Servicios</span>
          <span class="text-white/50 text-xs">{{ lastUpdate }}</span>
        </div>

        <!-- Lista de servicios -->
        <div class="p-3 space-y-2">
          <!-- Auth -->
          <div class="flex items-center justify-between px-2 py-1.5 rounded bg-white/5">
            <span class="text-white/70 text-xs">Auth</span>
            <span class="text-xs px-2 py-0.5 rounded-full" 
              [ngClass]="status?.services?.auth?.primary ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
              {{ status?.services?.auth?.primary ? 'OK' : 'Down' }}
            </span>
          </div>

          <!-- Users -->
          <div class="flex items-center justify-between px-2 py-1.5 rounded bg-white/5">
            <span class="text-white/70 text-xs">Users</span>
            <span class="text-xs px-2 py-0.5 rounded-full" 
              [ngClass]="status?.services?.users?.primary ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
              {{ status?.services?.users?.primary ? 'OK' : 'Down' }}
            </span>
          </div>

          <!-- Memes -->
          <div class="flex items-center justify-between px-2 py-1.5 rounded" 
            [ngClass]="status?.usingMirror?.memes ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5'">
            <div class="flex items-center gap-2">
              <span class="text-white/70 text-xs">Memes</span>
              <span *ngIf="status?.usingMirror?.memes" class="text-yellow-400 text-[10px] font-bold">[MIRROR]</span>
            </div>
            <div class="flex gap-1">
              <span class="text-xs px-1.5 py-0.5 rounded" 
                [ngClass]="status?.services?.memes?.primary ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                P:{{ status?.services?.memes?.primary ? '✓' : '✗' }}
              </span>
              <span class="text-xs px-1.5 py-0.5 rounded" 
                [ngClass]="status?.services?.memes?.mirror ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                M:{{ status?.services?.memes?.mirror ? '✓' : '✗' }}
              </span>
            </div>
          </div>

          <!-- Plantillas -->
          <div class="flex items-center justify-between px-2 py-1.5 rounded" 
            [ngClass]="status?.usingMirror?.plantillas ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5'">
            <div class="flex items-center gap-2">
              <span class="text-white/70 text-xs">Plantillas</span>
              <span *ngIf="status?.usingMirror?.plantillas" class="text-yellow-400 text-[10px] font-bold">[MIRROR]</span>
            </div>
            <div class="flex gap-1">
              <span class="text-xs px-1.5 py-0.5 rounded" 
                [ngClass]="status?.services?.plantillas?.primary ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                P:{{ status?.services?.plantillas?.primary ? '✓' : '✗' }}
              </span>
              <span class="text-xs px-1.5 py-0.5 rounded" 
                [ngClass]="status?.services?.plantillas?.mirror ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                M:{{ status?.services?.plantillas?.mirror ? '✓' : '✗' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer con leyenda -->
        <div class="px-4 py-2 border-t border-white/10 text-[10px] text-white/40">
          P = Principal | M = Mirror | * = Usando espejo
        </div>
      </div>
    </div>
  `
})
export class ServiceStatusComponent implements OnInit, OnDestroy {
  status: HealthStatus | null = null;
  showPanel = false;
  lastUpdate = '';
  private subscription: Subscription | null = null;

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.subscription = this.healthService.healthStatus$.subscribe(status => {
      this.status = status;
      if (status?.timestamp) {
        const date = new Date(status.timestamp);
        this.lastUpdate = date.toLocaleTimeString();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get isOnline(): boolean {
    return this.status?.gateway === 'healthy';
  }

  get isUsingMirror(): boolean {
    return this.status?.usingMirror?.memes || this.status?.usingMirror?.plantillas || false;
  }

  togglePanel(): void {
    this.showPanel = !this.showPanel;
  }
}

