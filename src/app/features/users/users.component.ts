import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: any;
  constructor(private seo: SeoService, private db: AngularFirestore) {}

  ngOnInit() {
    this.seo.generteTags({
      title: 'Customer List',
      description: 'A list filled with customers',
    });

    this.users$ = this.db
      .collection('customers')
      .valueChanges({ idField: 'id' });
  }
}
