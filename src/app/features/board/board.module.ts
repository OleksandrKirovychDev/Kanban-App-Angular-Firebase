import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BoardComponent } from './board.component';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
})
export class BoardModule {}
