import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, of, shareReplay } from 'rxjs';

import { barLinks, navLinks, menuLinks } from './constants/shell.constants';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  public barLinks$: Observable<navLinks[]> = of(barLinks);
  public menuLinks$: Observable<navLinks[]> = of(menuLinks);

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
