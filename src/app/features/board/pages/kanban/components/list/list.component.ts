import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List, Task } from 'src/app/features/board/models/board.model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { SharedModule } from '../../../../../../shared/shared.module';
import { BoardService } from '../../../../../../features/board/services/board.service';
import { TaskDialogComponent } from '../../../../../../features/board/dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, SharedModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() list: List;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.list.id, this.list.tasks);
  }

  public openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.list.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.list.id, [
            ...this.list.tasks,
            result.task,
          ]);
        } else {
          const update = this.list.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.list.id, this.list.tasks);
        }
      }
    });
  }
}
