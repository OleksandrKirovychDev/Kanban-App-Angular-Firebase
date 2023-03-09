import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { BoardService } from '../../services/board.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule, MatDialogModule],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private ps: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.ps.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }
}
