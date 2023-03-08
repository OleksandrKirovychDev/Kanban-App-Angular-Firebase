import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputComponent } from 'src/app/shared/components/input/input.component';

@Component({
  selector: 'app-reset',
  standalone: true,
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  imports: [SharedModule, CommonModule, ReactiveFormsModule, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetComponent implements OnInit {
  public errorMessage$: Observable<string> = this.authService.errorMsg$;

  public resetForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit() {
    const { email } = this.resetForm.value;
    this.authService.resetPassword(email);
  }
}
