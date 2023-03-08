import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SharedModule, ReactiveFormsModule],
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDialogComponent {
  title = new FormControl('');

  constructor(public dialogRef: MatDialogRef<BoardDialogComponent>) {}

  public onNoClick(): void {
    this.dialogRef.close(this.title.value);
  }
}
