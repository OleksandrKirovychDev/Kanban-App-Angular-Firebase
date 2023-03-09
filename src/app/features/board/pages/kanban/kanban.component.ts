import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { ListComponent } from './components/list/list.component';
import { List } from '../../models/board.model';
import { BoardDialogComponent } from '../../dialogs/board-dialog/board-dialog.component';
import { BoardService } from '../../services/board.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, SharedModule, DragDropModule, ListComponent],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanComponent {
  @Output() openDialog = new EventEmitter<null>();
  @Input() lists: List[];

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.lists);
  }

  public openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res)
        this.boardService.createBoad({
          title: res,
          priority: this.lists.length,
        } as List);
    });
  }
}
