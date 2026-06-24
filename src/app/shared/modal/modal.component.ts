import { NgComponentOutlet } from '@angular/common';
import { Component, inject, Injector, Input, Type } from '@angular/core';
import { MODAL_REF } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input()
  component!: Type<any>;

  injector = inject(Injector);

  modalRef = inject(MODAL_REF);

  closeModal() {
    this.modalRef.close();
  }
}
