import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { List } from './models/board.model';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  public boardData$: Observable<List[]> = this.boardService.getUserBoards();

  constructor(private boardService: BoardService) {}
}
