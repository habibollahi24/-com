import { Component, inject } from '@angular/core';
import { ProgresbarService } from './progresbar.service';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  progressbarService = inject(ProgresbarService);

  value = this.progressbarService.progress();
}
