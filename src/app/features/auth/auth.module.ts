import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { GoogleAuthDirective } from './directives/google-auth.directive';
import { AuthComponent } from './auth.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [GoogleAuthDirective, AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    InputComponent,
  ],
})
export class AuthModule {}
