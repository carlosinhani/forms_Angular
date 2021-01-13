import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/Dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
