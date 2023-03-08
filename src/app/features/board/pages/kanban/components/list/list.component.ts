import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from 'src/app/features/board/models/board.model';
import { BoardService } from 'src/app/features/board/services/board.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';

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

  constructor(private boardService: BoardService) {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.list.id, this.list.tasks);
  }
}
