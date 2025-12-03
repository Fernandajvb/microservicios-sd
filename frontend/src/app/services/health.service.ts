import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ServiceStatus {
  primary: boolean;
  mirror?: boolean;
}

export interface HealthStatus {
  gateway: string;
  timestamp: string;
  services: {
    auth: ServiceStatus;
    users: ServiceStatus;
    memes: ServiceStatus;
    plantillas: ServiceStatus;
  };
  usingMirror: {
    memes: boolean;
    plantillas: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly API_URL = 'http://localhost:3000/api/health';
  
  private healthStatusSubject = new BehaviorSubject<HealthStatus | null>(null);
  public healthStatus$ = this.healthStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar estado cada 3 segundos para mayor responsividad
    this.checkHealth();
    interval(500).subscribe(() => this.checkHealth());
  }

  checkHealth(): void {
    this.http.get<any>(this.API_URL).pipe(
      map(response => {
        const status: HealthStatus = {
          gateway: response.gateway,
          timestamp: response.timestamp,
          services: response.services,
          usingMirror: {
            memes: !response.services.memes?.primary && response.services.memes?.mirror,
            plantillas: !response.services.plantillas?.primary && response.services.plantillas?.mirror
          }
        };
        return status;
      }),
      catchError(() => {
        return new Observable<HealthStatus>(observer => {
          observer.next({
            gateway: 'offline',
            timestamp: new Date().toISOString(),
            services: {
              auth: { primary: false },
              users: { primary: false },
              memes: { primary: false, mirror: false },
              plantillas: { primary: false, mirror: false }
            },
            usingMirror: { memes: false, plantillas: false }
          });
          observer.complete();
        });
      })
    ).subscribe(status => {
      this.healthStatusSubject.next(status);
    });
  }

  getHealthStatus(): HealthStatus | null {
    return this.healthStatusSubject.value;
  }

  isUsingAnyMirror(): boolean {
    const status = this.healthStatusSubject.value;
    if (!status) return false;
    return status.usingMirror.memes || status.usingMirror.plantillas;
  }
}

