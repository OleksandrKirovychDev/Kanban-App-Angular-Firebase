import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [SharedModule, CommonModule, ReactiveFormsModule, InputComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public errorMessage$: Observable<string> = this.authService.errorMsg$;

  authForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
    });
  }

  get password() {
    return this.authForm.get('password');
  }

  get passwordConfirm() {
    return this.authForm.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    return this.password?.value === this.passwordConfirm?.value;
  }

  async onSubmit() {
    const { email, password } = this.authForm.value;
    this.authService.createUser(email, password);
  }
}
