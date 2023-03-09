/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModule],
})
export class UserDetailComponent implements OnInit {
  userId: string;
  user$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.user$ = this.db
      .collection('users')
      .doc<any>(this.userId)
      .valueChanges()
      .pipe(
        tap((cust) =>
          this.seo.generteTags({
            title: cust.name,
            description: cust.bio,
            image: cust.image,
          })
        )
      );
  }
}
