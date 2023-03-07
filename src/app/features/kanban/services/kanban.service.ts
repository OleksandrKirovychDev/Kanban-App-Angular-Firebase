import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { of, switchMap } from 'rxjs';

import { Board, Task } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  public async createBoad(data: Board) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'test', label: 'yellow' }],
    });
  }

  public deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  public updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  public removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }

  public getuserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('board', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return of([]);
        }
      })
    );
  }

  public sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection('boards').doc(b.id));
    refs.map((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
