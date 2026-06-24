import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgresbarService {
  private activeRequests = 0;
  private intervalId?: ReturnType<typeof setInterval>;

  readonly progress = signal(0);
  readonly isLoading = signal(false);

  start() {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.isLoading.set(true);
      this.progress.set(0);

      this.intervalId = setInterval(() => {
        const current = this.progress();

        if (current < 90) {
          this.progress.set(current + 5);
        }
      }, 200);
    }
  }

  stop() {
    this.activeRequests--;

    if (this.activeRequests <= 0) {
      this.activeRequests = 0;

      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      this.progress.set(100);

      setTimeout(() => {
        this.isLoading.set(false);
        this.progress.set(0);
      }, 300);
    }
  }
}
