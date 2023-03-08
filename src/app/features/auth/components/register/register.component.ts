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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [SharedModule, CommonModule, ReactiveFormsModule, InputComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public errorMessage$: Observable<string> = this.authService.errorMsg$;

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
    });
  }

  public get passwordDoesMatch() {
    const { password, passwordConfirm } = this.registerForm.value;
    return password === passwordConfirm;
  }

  public onSubmit() {
    const { email, password } = this.registerForm.value;
    this.authService.createUser(email, password);
  }
}
