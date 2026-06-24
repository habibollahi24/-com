import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorFieldComponent } from './error-field/error-field.component';

@NgModule({
  declarations: [InputComponent, ErrorFieldComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, InputComponent, ErrorFieldComponent],
})
export class SharedModule {}
